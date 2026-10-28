import { spawn } from "node:child_process";
import { mkdir, readdir, rename, rm, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const input = path.join(root, "src/assets/videos/original");
const output = path.join(root, "public/videos");
const args = process.argv.slice(2);
const crf = Number(args[0] || 25);
if (args.length > 1 || !Number.isInteger(crf) || crf < 18 || crf > 32) {
  console.error(
    "Usage: node scripts/optimise-videos.mjs [CRF 18-32, default 25]",
  );
  process.exit(1);
}
function run(command, parameters) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, parameters, {
      stdio: "inherit",
      shell: false,
    });
    child.on("error", (error) =>
      reject(
        new Error(
          error.code === "ENOENT"
            ? "Install FFmpeg locally, then run this command again."
            : error.message,
        ),
      ),
    );
    child.on("exit", (code) =>
      code === 0
        ? resolve()
        : reject(
            new Error(
              `${command} failed (exit ${code}). Existing outputs were preserved.`,
            ),
          ),
    );
  });
}
await mkdir(input, { recursive: true });
const sources = (await readdir(input))
  .filter((name) => /\.mp4$/i.test(name))
  .sort();
if (!sources.length) {
  console.log(
    "No source MP4 files found. Add huugo-promotion.mp4 to src/assets/videos/original, then run again.",
  );
} else {
  await mkdir(output, { recursive: true });
  for (const name of sources) {
    const source = path.join(input, name);
    const destination = path.join(output, name.replace(/\.mp4$/i, ".mp4"));
    const temporary = path.join(output, `.${name}.${process.pid}.tmp.mp4`);
    try {
      await run("ffmpeg", [
        "-hide_banner",
        "-loglevel",
        "warning",
        "-nostdin",
        "-y",
        "-i",
        source,
        "-map",
        "0:v:0",
        "-map",
        "0:a:0?",
        "-map_metadata",
        "-1",
        "-map_chapters",
        "-1",
        "-vf",
        "scale=w='min(1280,iw)':h='min(1280,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",
        "-c:v",
        "libx264",
        "-preset",
        "slow",
        "-crf",
        String(crf),
        "-pix_fmt",
        "yuv420p",
        "-c:a",
        "aac",
        "-b:a",
        "96k",
        "-ac",
        "2",
        "-movflags",
        "+faststart",
        temporary,
      ]);
      const before = (await stat(source)).size;
      const after = (await stat(temporary)).size;
      if (after <= 0) throw new Error("FFmpeg produced an empty output.");
      // The source is never overwritten. Publish only complete, successful encodes.
      await rename(temporary, destination);
      console.log(
        `${name}: ${(before / 1e6).toFixed(2)} MB → ${(after / 1e6).toFixed(2)} MB (${((1 - after / before) * 100).toFixed(1)}% reduction)`,
      );
      if (after >= before)
        console.warn(
          "This source was already efficient. Re-encoding did not reduce its size; compare both files before publishing.",
        );
    } finally {
      await rm(temporary, { force: true });
    }
  }
}
