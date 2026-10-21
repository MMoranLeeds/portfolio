import metadata from "@/assets/images/dist/metadata.json";
import type { ProjectImage } from "@/types/project";

const files = import.meta.glob<string>("/src/assets/images/dist/huugo/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});
const dimensions: Record<string, { width: number; height: number }> = metadata;
type ImageName =
  | "master"
  | "chat"
  | "basket"
  | "campaign-tennis"
  | "campaign-baking"
  | "campaign-festival"
  | "early-results";

export function huugoImage(
  name: ImageName,
  label: string,
  alt: string,
  caption: string,
): ProjectImage {
  const stem = `huugo/${name}`;
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
    previewMaxWidth: name === "basket" ? "24rem" : undefined,
  };
}
