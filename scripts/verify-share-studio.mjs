import assert from "node:assert/strict";
import { readFile, readdir, access } from "node:fs/promises";
// Studio is local by default. Hosted authentication is not part of this project.
const enabled = process.argv.includes("--enabled");
const files = await readdir("dist/assets");
const studio = files.filter((file) => file.startsWith("ShareImageStudio"));
const sitemap = await readFile("dist/sitemap.xml", "utf8");
assert(!sitemap.includes("_studio"));
const homepage = await readFile("dist/index.html", "utf8");
assert(!homepage.includes('href="/_studio/share-image'));
assert(
  !/<(?:script|link)[^>]*(?:src|href)="[^"]*ShareImageStudio/.test(homepage),
  "Public page must not load/preload studio code",
);
if (enabled) {
  assert(studio.some((file) => file.endsWith(".js")));
  await access("dist/_studio/share-image/index.html");
  const html = await readFile("dist/_studio/share-image/index.html", "utf8");
  assert(html.includes('content="noindex, nofollow, noarchive"'));
  assert(!html.includes("application/ld+json"));
  assert(html.includes("Share image studio"));
  for (const name of ["Download PNG", "Download JPEG"])
    assert(html.includes(name));
  for (const file of files.filter(
    (file) => file.startsWith("index-") && file.endsWith(".js"),
  )) {
    const js = await readFile(`dist/assets/${file}`, "utf8");
    assert(
      !js.includes("Horizontal crop"),
      "Studio UI must remain in its own lazy chunk",
    );
  }
} else {
  assert.equal(
    studio.length,
    0,
    "Default production builds must omit studio chunks",
  );
}
console.log(
  "Studio route isolation, metadata, sitemap and lazy loading verified.",
);
