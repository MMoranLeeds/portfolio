import { shareStudioEnabled, shareStudioPath } from "./config/studioRoute";
import { renderToString } from "vue/server-renderer";
import { createPortfolioApp } from "./app";
import { projects } from "./data/projects/index";
import { metadataFor, renderHead } from "./seo/metadata";
const slugs = projects.map((project) => project.slug);
if (
  new Set(slugs).size !== slugs.length ||
  slugs.some((slug) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
) {
  throw new Error(
    "Project slugs must be unique, lower-case and hyphen-separated.",
  );
}
export const paths = [
  "/",
  "/cv",
  ...projects.map((project) => `/work/${project.slug}`),
];
export const privatePaths = shareStudioEnabled ? [shareStudioPath] : [];
export async function render(path: string) {
  const { app, router } = createPortfolioApp(true);
  await router.push(path);
  await router.isReady();
  return {
    html: await renderToString(app),
    head: renderHead(metadataFor(path)),
  };
}
