import metadata from "@/assets/images/dist/metadata.json";
import type { Project, ProjectImage } from "@/types/project";

// Drop a PNG/JPEG named after the project slug into original/cards, then optimise.
// Static asset imports keep the resulting WebP URLs compatible with Vite builds.
const files = import.meta.glob<string>("/src/assets/images/dist/cards/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});
const dimensions: Record<string, { width: number; height: number }> = metadata;

export function projectCardImage(project: Project): ProjectImage {
  const variants = ["-320", "-640", "-960", ""].flatMap((suffix) => {
    const name = `cards/${project.slug}${suffix}.webp`;
    const src = files[`/src/assets/images/dist/${name}`];
    const size = dimensions[name];
    return src && size ? [{ src, ...size }] : [];
  });
  if (variants.length) {
    const display =
      variants.find((image) => image.width >= 960) || variants.at(-1)!;
    const unique = variants.filter(
      (image, index) =>
        variants.findIndex((other) => other.width === image.width) === index,
    );
    return {
      src: display.src,
      fullSrc: variants.at(-1)!.src,
      srcset: unique.map((image) => `${image.src} ${image.width}w`).join(", "),
      width: display.width,
      height: display.height,
      alt: project.card?.alt || `${project.title} interface preview`,
      caption: "",
    };
  }
  // Retain existing artwork until a genuine screenshot is available for this project.
  return project.cover;
}

/** Projects can opt into using their selected card screenshot in the header. */
export function projectHeaderImage(project: Project): ProjectImage {
  if (!project.card?.header) return project.cover;
  return {
    ...project.cover,
    ...projectCardImage(project),
    sizes: project.cover.sizes,
    ...project.card.header,
  };
}
