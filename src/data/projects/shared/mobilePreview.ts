import metadata from "@/assets/images/dist/metadata.json";
import type { Project, ProjectImage } from "@/types/project";

const files = import.meta.glob<string>(
  "/src/assets/images/dist/mobile/*.webp",
  { eager: true, query: "?url", import: "default" },
);
const dimensions: Record<string, { width: number; height: number }> = metadata;
export interface MobilePreview extends ProjectImage {
  placeholder: boolean;
}

/** Add original/mobile/<project-slug>.png and optimise to replace automatically. */
export function projectMobilePreview(
  project: Project,
): MobilePreview | undefined {
  const fallback = project.mobile;
  const slug = project.slug;
  if (!fallback) return;
  const stem = `mobile/${slug}`;
  const variants = ["-320", "-640", "-960", ""].flatMap((suffix) => {
    const name = `${stem}${suffix}.webp`;
    const src = files[`/src/assets/images/dist/${name}`];
    const size = dimensions[name];
    return src && size ? [{ src, ...size }] : [];
  });
  if (variants.length) {
    const full = variants.at(-1)!;
    const display = variants[1] || full;
    const unique = variants.filter(
      (image, index) =>
        variants.findIndex((other) => other.width === image.width) === index,
    );
    return {
      ...display,
      fullSrc: full.src,
      srcset: unique.map((image) => `${image.src} ${image.width}w`).join(", "),
      sizes: "(max-width: 639px) 17vw, 126px",
      label: fallback.label || "Mobile view",
      alt: fallback.alt || `${project.title} interface on a mobile viewport.`,
      caption: fallback.caption || `Mobile interface for ${project.title}.`,
      placeholder: false,
    };
  }
  return {
    src: fallback.fallbackSrc,
    width: 390,
    height: 844,
    label: "Mobile preview · placeholder",
    alt: `Placeholder for a mobile screenshot of ${project.title}.`,
    caption: "Mobile screenshot to follow.",
    placeholder: true,
  };
}
