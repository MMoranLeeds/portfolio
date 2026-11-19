import metadata from "@/assets/images/dist/metadata.json";
import type { ProjectImage } from "@/types/project";

const files = import.meta.glob<string>(
  [
    "/src/assets/images/dist/nextramble-android/*.webp",
    "/src/assets/images/dist/cards/*.webp",
  ],
  { eager: true, query: "?url", import: "default" },
);
const dimensions: Record<string, { width: number; height: number }> = metadata;
type ImageName =
  | "overview"
  | "light-01-home"
  | "dark-01-home"
  | "light-04-walk-details"
  | "light-09-search-results"
  | "light-10-search-filters"
  | "light-11-search-walks-tab"
  | "light-18-date-picker"
  | "light-19-time-picker"
  | "light-21-invite";

export function androidImage(
  name: ImageName,
  label: string,
  alt: string,
  caption: string,
  previewAspectRatio = name === "overview" ? "12 / 5" : "6 / 13",
  previewPosition = "top",
): ProjectImage {
  const stem = `nextramble-android/${name}`;
  const variants = ["-320", "-640", "-960", ""].map((suffix) => {
    const key = `${stem}${suffix}.webp`;
    const src = files[`/src/assets/images/dist/${key}`];
    const size = dimensions[key];
    if (!src || !size)
      throw new Error(
        `Missing optimised image: ${key}. Run npm run images:optimise.`,
      );
    return { src, ...size };
  });
  const display = variants[2]!;
  const full = variants[3]!;
  const unique = variants.filter(
    (image, index) =>
      variants.findIndex((other) => other.width === image.width) === index,
  );
  return {
    src: display.src,
    fullSrc: full.src,
    srcset: unique.map((image) => `${image.src} ${image.width}w`).join(", "),
    sizes:
      "(max-width: 959px) min(720px, calc(100vw - 3rem)), (max-width: 1147px) calc(100vw - 408px), 740px",
    width: display.width,
    height: display.height,
    label,
    alt,
    caption,
    previewAspectRatio,
    previewPosition,
    previewMaxWidth: name === "overview" ? undefined : "21rem",
  };
}
