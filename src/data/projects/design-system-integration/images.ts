import metadata from "@/assets/images/dist/metadata.json";
import type { ProjectImage } from "@/types/project";

const files = import.meta.glob<string>(
  [
    "/src/assets/images/dist/design-system-integration/*.webp",
    "/src/assets/images/dist/cards/*.webp",
  ],
  { eager: true, query: "?url", import: "default" },
);
const dimensions: Record<string, { width: number; height: number }> = metadata;
type ImageName =
  | "overview"
  | "components"
  | "calendar-source-diff"
  | "calendar-storybook"
  | "token-change"
  | "claude-review"
  | "code-update"
  | "fab-storybook"
  | "fab-review"
  | "fab-applied"
  | "fab-figma";

export function designSystemImage(
  name: ImageName,
  label: string,
  alt: string,
  caption: string,
  previewAspectRatio = "4 / 3",
  previewPosition = "top",
): ProjectImage {
  const stem = `design-system-integration/${name}`;
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
  };
}
