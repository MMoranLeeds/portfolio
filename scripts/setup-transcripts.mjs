import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const packagePath = path.join(root, "package.json");
const pkg = JSON.parse(await readFile(packagePath, "utf8"));
const scripts = {
  "transcript:generate": "node scripts/transcripts.mjs generate",
  "transcript:publish": "node scripts/transcripts.mjs publish",
};
for (const [name, value] of Object.entries(scripts)) {
  if (pkg.scripts?.[name] && pkg.scripts[name] !== value) {
    throw new Error(
      `${name} already has a different command. Existing package.json has been preserved.`,
    );
  }
}
pkg.scripts = { ...pkg.scripts, ...scripts };
await writeFile(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
const ignorePath = path.join(root, ".gitignore");
let ignore = await readFile(ignorePath, "utf8").catch((error) => {
  if (error.code === "ENOENT") return "";
  throw error;
});
const additions = ["/.venv-transcripts/", "/.transcripts/"].filter(
  (line) => !ignore.split(/\r?\n/).includes(line),
);
if (additions.length) {
  ignore += `${ignore && !ignore.endsWith("\n") ? "\n" : ""}\n# Local video transcription tools and unreviewed drafts\n${additions.join("\n")}\n`;
  await writeFile(ignorePath, ignore);
}
console.log(
  "Transcript npm commands installed. Existing scripts and dependencies were retained.",
);
console.log(
  "Next: follow docs/video-transcripts.md to install the local transcription tools.",
);
