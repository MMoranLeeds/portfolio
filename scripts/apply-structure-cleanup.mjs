import { createHash } from "node:crypto";
import { lstat, readFile, unlink } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Only explicitly listed, unchanged old files can be removed. Dry-run by default.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
if (args.length > 1 || (args.length === 1 && args[0] !== "--apply")) {
  console.error("Usage: node scripts/apply-structure-cleanup.mjs [--apply]");
  process.exitCode = 1;
} else {
  try {
    await clean(args[0] === "--apply");
  } catch (error) {
    console.error(`Structure cleanup: ${error.message}`);
    process.exitCode = 1;
  }
}

function localPath(value) {
  const target = resolve(root, value);
  const location = relative(root, target);
  if (!location || location.startsWith("..") || isAbsolute(location))
    throw new Error(`Path is outside the project: ${value}`);
  return target;
}

async function clean(apply) {
  const { name } = JSON.parse(
    await readFile(localPath("package.json"), "utf8"),
  );
  if (name !== "matthew-moran-portfolio")
    throw new Error("This task is only for the Matthew Moran portfolio.");
  const manifest = JSON.parse(
    await readFile(localPath("docs/structure-migration.json"), "utf8"),
  );
  const pending = [];
  // Complete all checks before removing any file.
  for (const entry of manifest.files) {
    for (const replacement of entry.replacements) {
      if (!(await lstat(localPath(replacement))).isFile())
        throw new Error(`Missing replacement file: ${replacement}`);
    }
    const target = localPath(entry.path);
    let stats;
    try {
      stats = await lstat(target);
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }
    if (!stats.isFile())
      throw new Error(`Expected an ordinary file: ${entry.path}`);
    const digest = createHash("sha256")
      .update(await readFile(target))
      .digest("hex");
    if (digest !== entry.sha256)
      throw new Error(
        `${entry.path} has local changes. No files have been removed. Compare it with its replacements and merge any edits before manually removing the old file.`,
      );
    pending.push({ path: entry.path, target });
  }
  if (!pending.length) {
    console.log("Cleanup complete: no obsolete files remain.");
    return;
  }
  for (const item of pending)
    console.log(`${apply ? "Remove" : "Would remove"}: ${item.path}`);
  if (!apply) {
    console.log(
      "Dry run only. Rerun with --apply to remove these obsolete files.",
    );
    return;
  }
  for (const item of pending) await unlink(item.target);
  console.log(
    `Removed ${pending.length} obsolete files. No assets or directories were removed.`,
  );
}
