import { readdir, mkdir, rm, rename, writeFile } from "node:fs/promises";
import { watch } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const originals = path.join(root, "src/assets/images/original");
const publicOriginals = path.join(root, "public/images");
const output = path.join(root, "src/assets/images/dist");
const staging = path.join(root, "src/assets/images/.staging");

async function listImages(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await listImages(location)));
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) files.push(location);
  }
  return files.sort();
}

async function optimise() {
  await mkdir(originals, { recursive: true });
  const sources = [
    ...(await listImages(originals)).map((source) => ({
      source,
      stem: path
        .relative(originals, source)
        .replace(/\.(jpe?g|png|webp)$/i, ""),
    })),
    ...(await listImages(publicOriginals)).map((source) => ({
      source,
      stem: path.join(
        "covers",
        path
          .relative(publicOriginals, source)
          .replace(/\.(jpe?g|png|webp)$/i, ""),
      ),
    })),
  ];
  const names = new Set();
  const jobs = sources.map(({ source, stem }) => {
    const portrait = stem === "profile";
    const widths = portrait
      ? [320, 640]
      : stem.startsWith("covers/")
        ? [320, 480, 640, 960, 1600]
        : [320, 640, 960, 1600];
    for (const width of widths) {
      const suffix = width === (portrait ? 640 : 1600) ? "" : `-${width}`;
      const name = stem + suffix + ".webp";
      if (names.has(name.toLowerCase()))
        throw new Error(`Image filename collision: ${name}`);
      names.add(name.toLowerCase());
    }
    return { source, stem, widths };
  });
  if (!names.has("profile.webp"))
    throw new Error(
      "Add profile.jpg, profile.jpeg, profile.png or profile.webp to src/assets/images/original.",
    );
  await rm(staging, { recursive: true, force: true });
  await mkdir(staging, { recursive: true });
  const coverMetadata = {};
  const imageMetadata = {};
  try {
    for (const { source, stem, widths } of jobs) {
      const portrait = stem === "profile";
      for (const width of widths) {
        const suffix = width === (portrait ? 640 : 1600) ? "" : `-${width}`;
        const destination = path.join(staging, stem + suffix + ".webp");
        await mkdir(path.dirname(destination), { recursive: true });
        const pipeline = sharp(source).rotate();
        if (portrait)
          pipeline.resize({
            width,
            height: width,
            fit: "cover",
            position: "attention",
          });
        else pipeline.resize({ width, withoutEnlargement: true });
        // Default Sharp output strips EXIF and other metadata after applying orientation.
        const info = await pipeline
          .webp({
            quality:
              /^(onboarding|cards|accessible-trades|localisation|cookie-consent)\//.test(
                stem,
              )
                ? 88
                : 82,
            effort:
              /^(onboarding|cards|accessible-trades|localisation|cookie-consent)\//.test(
                stem,
              )
                ? 6
                : 5,
          })
          .toFile(destination);
        imageMetadata[stem + suffix + ".webp"] = {
          width: info.width,
          height: info.height,
          bytes: info.size,
        };
        if (stem.startsWith("covers/"))
          coverMetadata[stem + suffix + ".webp"] = {
            width: info.width,
            height: info.height,
            bytes: info.size,
          };
        console.log(
          `${stem} → ${stem + suffix}.webp (${info.width}×${info.height}, ${info.size} bytes)`,
        );
      }
    }
    await mkdir(path.join(staging, "covers"), { recursive: true });
    await writeFile(
      path.join(staging, "metadata.json"),
      JSON.stringify(imageMetadata, null, 2) + "\n",
    );
    await writeFile(
      path.join(staging, "covers/metadata.json"),
      JSON.stringify(coverMetadata, null, 2) + "\n",
    );
    await rm(output, { recursive: true, force: true });
    await rename(staging, output);
  } catch (error) {
    await rm(staging, { recursive: true, force: true });
    throw error;
  }
}

await optimise();
if (process.argv.includes("--watch")) {
  let timer;
  let running = false;
  let pending = false;
  const run = async () => {
    if (running) {
      pending = true;
      return;
    }
    running = true;
    try {
      await optimise();
    } catch (error) {
      console.error(error.message);
    } finally {
      running = false;
      if (pending) {
        pending = false;
        void run();
      }
    }
  };
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(() => void run(), 250);
  };
  watch(originals, { recursive: true }, schedule);
  watch(publicOriginals, { recursive: true }, schedule);
  console.log(
    "Watching original images and public covers. Keep this running alongside npm run dev.",
  );
}
