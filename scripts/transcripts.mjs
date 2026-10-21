import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import {
  access,
  mkdir,
  readFile,
  writeFile,
  rename,
  mkdtemp,
  rm,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const videos = {
  "huugo-promotion": "huugo-promotion.mp4",
  "accessible-trades-workflow": "accessible-trades-workflow.mp4",
};
const [action, ...args] = process.argv.slice(2);
const options = {};
try {
  if (!["generate", "publish"].includes(action))
    throw new Error("Choose generate or publish.");
  for (let i = 0; i < args.length; i += 2) {
    if (
      !["--project", "--model", "--captions"].includes(args[i]) ||
      !args[i + 1] ||
      options[args[i]] !== undefined
    ) {
      throw new Error(
        "Use --project NAME, --model MODEL, or --captions yes|no.",
      );
    }
    options[args[i]] = args[i + 1];
  }
  if (options["--project"] && !Object.hasOwn(videos, options["--project"]))
    throw new Error(
      `Unknown project. Choose ${Object.keys(videos).join(" or ")}.`,
    );
  if (action === "publish" && !options["--project"])
    throw new Error(
      "Publish one reviewed video at a time with --project NAME.",
    );
  if (action === "publish" && !["yes", "no"].includes(options["--captions"]))
    throw new Error(
      "Confirm whether captions are appropriate with --captions yes or --captions no.",
    );
  if (action === "publish" && options["--model"])
    throw new Error("--model applies only to generate.");
  if (action === "generate" && options["--captions"])
    throw new Error("--captions applies only to publish.");
  const selected = options["--project"]
    ? [options["--project"]]
    : Object.keys(videos);
  for (const key of selected) {
    if (action === "generate") await generate(key);
    else await publish(key);
  }
} catch (error) {
  console.error(`\nTranscript task: ${error.message}`);
  process.exitCode = 1;
}

function run(command, parameters) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, parameters, {
      cwd: root,
      stdio: "inherit",
      shell: false,
    });
    child.on("error", (error) =>
      reject(
        new Error(
          error.code === "ENOENT"
            ? `Cannot find ${command}. Follow docs/video-transcripts.md to install the local tools.`
            : error.message,
        ),
      ),
    );
    child.on("exit", (code) =>
      code === 0
        ? resolve()
        : reject(
            new Error(
              `Process failed with exit ${code}. Published files have not been changed.`,
            ),
          ),
    );
  });
}
async function sourceFor(key) {
  for (const directory of ["src/assets/videos/original", "public/videos"]) {
    const file = path.join(root, directory, videos[key]);
    try {
      await access(file);
      return file;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  throw new Error(
    `Missing ${videos[key]}. Add it to src/assets/videos/original or public/videos before generating.`,
  );
}
function hash(data) {
  return createHash("sha256").update(data).digest("hex");
}
async function atomicWrite(file, text) {
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await writeFile(temporary, text);
  await rename(temporary, file);
}
async function generate(key) {
  const source = await sourceFor(key);
  const draft = path.join(root, ".transcripts", key);
  await mkdir(draft, { recursive: true });
  const temporary = await mkdtemp(path.join(draft, ".run-"));
  const python =
    process.env.TRANSCRIPT_PYTHON ||
    path.join(
      root,
      ".venv-transcripts",
      process.platform === "win32" ? "Scripts/python.exe" : "bin/python",
    );
  const model = options["--model"] || "small.en";
  try {
    console.log(
      `Generating local drafts for ${key}. The first run downloads model weights.`,
    );
    await run(python, [
      "-m",
      "whisper",
      source,
      "--model",
      model,
      "--language",
      "English",
      "--task",
      "transcribe",
      "--device",
      "cpu",
      "--fp16",
      "False",
      "--output_format",
      "all",
      "--output_dir",
      temporary,
    ]);
    const base = path.basename(source, path.extname(source));
    const txt = await readFile(path.join(temporary, `${base}.txt`), "utf8");
    const vtt = await readFile(path.join(temporary, `${base}.vtt`), "utf8");
    if (!txt.trim())
      throw new Error(
        "No transcript text was generated. If this is a visual-only film, write a descriptive transcript using the guide.",
      );
    // Drafts are never served by Vite or Netlify. Re-generation replaces drafts only.
    await atomicWrite(path.join(draft, "transcript.txt"), txt);
    await atomicWrite(path.join(draft, "captions.en.vtt"), vtt);
    await atomicWrite(
      path.join(draft, "source.json"),
      `${JSON.stringify({ source: path.relative(root, source), sha256: hash(await readFile(source)), model }, null, 2)}\n`,
    );
    console.log(
      `Review ${path.relative(root, draft)}/transcript.txt and captions.en.vtt, then run transcript:publish for this project.`,
    );
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}
async function publish(key) {
  const draft = path.join(root, ".transcripts", key);
  const txt = (
    await readFile(path.join(draft, "transcript.txt"), "utf8")
  ).trim();
  if (!txt) throw new Error("The reviewed transcript is empty.");
  const useCaptions = options["--captions"] === "yes";
  const vtt = useCaptions
    ? await readFile(path.join(draft, "captions.en.vtt"), "utf8")
    : undefined;
  if (
    useCaptions &&
    (!/^\uFEFF?WEBVTT(?:\s|$)/.test(vtt) || !vtt.includes("-->"))
  )
    throw new Error("The captions file needs a WEBVTT header and timed cues.");
  let manifest;
  try {
    manifest = JSON.parse(
      await readFile(path.join(draft, "source.json"), "utf8"),
    );
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (manifest) {
    const source = await sourceFor(key);
    if (hash(await readFile(source)) !== manifest.sha256)
      throw new Error(
        "The source video has changed. Generate and review new drafts before publishing.",
      );
  }
  const registryPath = path.join(
    root,
    "src/data/projects/generated/videoTranscripts.ts",
  );
  const registryText = await readFile(registryPath, "utf8");
  const marker = "// PUBLISHED_TRANSCRIPTS_JSON\n// prettier-ignore\n";
  let registry = {};
  if (registryText.includes(marker)) {
    const json = registryText
      .split(marker)[1]
      ?.match(
        /export const projectVideoTranscripts: Record<string, ProjectVideoTranscript> = ([\s\S]*);\s*$/,
      )?.[1];
    if (!json)
      throw new Error(
        "Could not safely read the existing transcript registry. Published files were preserved.",
      );
    registry = JSON.parse(json);
  } else if (!/projectVideoTranscripts[^=]*=\s*\{\s*\};/.test(registryText)) {
    throw new Error(
      "The transcript registry has custom entries. Retain them using the format described in the guide before publishing.",
    );
  }
  const prefix = `/videos/captions/${key}.en`;
  registry[key] = {
    ...(useCaptions ? { captionsSrc: `${prefix}.vtt` } : {}),
    transcriptSrc: `${prefix}.txt`,
    transcript: txt
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
      .filter(Boolean),
  };
  await atomicWrite(path.join(root, "public", `${prefix}.txt`), `${txt}\n`);
  if (useCaptions)
    await atomicWrite(path.join(root, "public", `${prefix}.vtt`), vtt);
  else await rm(path.join(root, "public", `${prefix}.vtt`), { force: true });
  const header =
    "export interface ProjectVideoTranscript {\n  captionsSrc?: string;\n  transcriptSrc: string;\n  transcript: string[];\n}\n\n// Generated from reviewed drafts by npm run transcript:publish.\n";
  await atomicWrite(
    registryPath,
    `${header}${marker}export const projectVideoTranscripts: Record<string, ProjectVideoTranscript> = ${JSON.stringify(registry, null, 2)};\n`,
  );
  console.log(
    `Published ${key}. Check the captions and expandable transcript in the local portfolio, then commit the registry and public/videos/captions files.`,
  );
}
