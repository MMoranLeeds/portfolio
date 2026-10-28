import metadata from "@/assets/images/dist/metadata.json";
import type { ProjectImage } from "@/types/project";

const files = import.meta.glob<string>(
  [
    "/src/assets/images/dist/cards/*.webp",
    "/src/assets/images/dist/cookie-consent/*.webp",
  ],
  { eager: true, query: "?url", import: "default" },
);
const dimensions: Record<string, { width: number; height: number }> = metadata;
export type ConsentImageName =
  | "overview"
  | "desktop-before"
  | "desktop-after"
  | "mobile-before"
  | "mobile-after"
  | "test-results";

/** Missing evidence images stay as explicit placeholders until originals are supplied. */
export function consentImage(
  name: ConsentImageName,
  label: string,
  alt: string,
  caption: string,
): ProjectImage | undefined {
  const stem =
    name === "overview"
      ? "cards/fruugo-cookie-consent"
      : `cookie-consent/${name}`;
  const variants = ["-320", "-640", "-960", ""].flatMap((suffix) => {
    const key = `${stem}${suffix}.webp`;
    const src = files[`/src/assets/images/dist/${key}`];
    const size = dimensions[key];
    return src && size ? [{ src, ...size }] : [];
  });
  if (!variants.length) return;
  const display =
    variants.find((image) => image.width >= 960) || variants.at(-1)!;
  const full = variants.at(-1)!;
  const unique = variants.filter(
    (image, index) =>
      variants.findIndex((other) => other.width === image.width) === index,
  );
  return {
    ...display,
    fullSrc: full.src,
    srcset: unique.map((image) => `${image.src} ${image.width}w`).join(", "),
    sizes:
      "(max-width: 959px) min(720px, calc(100vw - 3rem)), (max-width: 1147px) calc(100vw - 408px), 740px",
    label,
    alt,
    caption,
    previewAspectRatio: name.startsWith("mobile") ? "390 / 844" : undefined,
    previewPosition: "top",
    ...(name.startsWith("mobile") ? { previewMaxWidth: "22rem" } : {}),
  };
}
