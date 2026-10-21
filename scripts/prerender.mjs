import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { paths, privatePaths, render } from "../.ssr/entry-server.js";

const template = await readFile("dist/index.html", "utf8");
if (
  !template.includes("<!--page-head-->") ||
  !template.includes("<!--app-html-->")
) {
  throw new Error("Prerender template markers are missing.");
}
const pages = [...paths, ...privatePaths, "/404"];
for (const path of pages) {
  const result = await render(path);
  const file =
    path === "/404"
      ? "dist/404.html"
      : path === "/"
        ? "dist/index.html"
        : `dist${path}/index.html`;
  await mkdir(dirname(resolve(file)), { recursive: true });
  await writeFile(
    file,
    template
      .replace("<!--page-head-->", result.head)
      .replace("<!--app-html-->", result.html),
  );
  console.log(`Generated ${file}`);
}
const homepage = await render("/");
const canonical = homepage.head.match(/rel="canonical" href="([^"]+)"/)[1];
const origin = new URL(canonical).origin;
const indexable = homepage.head.includes('content="index, follow"');
const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${escapeXml(new URL(path, origin).href)}</loc></url>`).join("\n")}\n</urlset>\n`,
);
await writeFile(
  "dist/robots.txt",
  indexable
    ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n",
);
if (!indexable)
  console.warn(
    "Local preview build uses noindex. Set VITE_SITE_URL to your live origin before the production build.",
  );
await rm(".ssr", { recursive: true, force: true });
