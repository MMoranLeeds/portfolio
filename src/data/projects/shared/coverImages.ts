import metadata from "@/assets/images/dist/covers/metadata.json";
import cover0_0 from "@/assets/images/dist/covers/accessible-trades-journey-320.webp";
import cover0_1 from "@/assets/images/dist/covers/accessible-trades-journey-480.webp";
import cover0_2 from "@/assets/images/dist/covers/accessible-trades-journey-640.webp";
import cover0_3 from "@/assets/images/dist/covers/accessible-trades-journey-960.webp";
import cover0_4 from "@/assets/images/dist/covers/accessible-trades-journey.webp";
import cover1_0 from "@/assets/images/dist/covers/huugo-shopping-journey-320.webp";
import cover1_1 from "@/assets/images/dist/covers/huugo-shopping-journey-480.webp";
import cover1_2 from "@/assets/images/dist/covers/huugo-shopping-journey-640.webp";
import cover1_3 from "@/assets/images/dist/covers/huugo-shopping-journey-960.webp";
import cover1_4 from "@/assets/images/dist/covers/huugo-shopping-journey.webp";
import cover2_0 from "@/assets/images/dist/covers/fruugo-localisation-overview-320.webp";
import cover2_1 from "@/assets/images/dist/covers/fruugo-localisation-overview-480.webp";
import cover2_2 from "@/assets/images/dist/covers/fruugo-localisation-overview-640.webp";
import cover2_3 from "@/assets/images/dist/covers/fruugo-localisation-overview-960.webp";
import cover2_4 from "@/assets/images/dist/covers/fruugo-localisation-overview.webp";
import cover3_0 from "@/assets/images/dist/covers/fruugo-merchant-onboarding-320.webp";
import cover3_1 from "@/assets/images/dist/covers/fruugo-merchant-onboarding-480.webp";
import cover3_2 from "@/assets/images/dist/covers/fruugo-merchant-onboarding-640.webp";
import cover3_3 from "@/assets/images/dist/covers/fruugo-merchant-onboarding-960.webp";
import cover3_4 from "@/assets/images/dist/covers/fruugo-merchant-onboarding.webp";

const variants = {
  "accessible-trades-journey": [
    { src: cover0_0, ...metadata["covers/accessible-trades-journey-320.webp"] },
    { src: cover0_1, ...metadata["covers/accessible-trades-journey-480.webp"] },
    { src: cover0_2, ...metadata["covers/accessible-trades-journey-640.webp"] },
    { src: cover0_3, ...metadata["covers/accessible-trades-journey-960.webp"] },
    { src: cover0_4, ...metadata["covers/accessible-trades-journey.webp"] },
  ],
  "huugo-shopping-journey": [
    { src: cover1_0, ...metadata["covers/huugo-shopping-journey-320.webp"] },
    { src: cover1_1, ...metadata["covers/huugo-shopping-journey-480.webp"] },
    { src: cover1_2, ...metadata["covers/huugo-shopping-journey-640.webp"] },
    { src: cover1_3, ...metadata["covers/huugo-shopping-journey-960.webp"] },
    { src: cover1_4, ...metadata["covers/huugo-shopping-journey.webp"] },
  ],
  "fruugo-localisation-overview": [
    {
      src: cover2_0,
      ...metadata["covers/fruugo-localisation-overview-320.webp"],
    },
    {
      src: cover2_1,
      ...metadata["covers/fruugo-localisation-overview-480.webp"],
    },
    {
      src: cover2_2,
      ...metadata["covers/fruugo-localisation-overview-640.webp"],
    },
    {
      src: cover2_3,
      ...metadata["covers/fruugo-localisation-overview-960.webp"],
    },
    { src: cover2_4, ...metadata["covers/fruugo-localisation-overview.webp"] },
  ],
  "fruugo-merchant-onboarding": [
    {
      src: cover3_0,
      ...metadata["covers/fruugo-merchant-onboarding-320.webp"],
    },
    {
      src: cover3_1,
      ...metadata["covers/fruugo-merchant-onboarding-480.webp"],
    },
    {
      src: cover3_2,
      ...metadata["covers/fruugo-merchant-onboarding-640.webp"],
    },
    {
      src: cover3_3,
      ...metadata["covers/fruugo-merchant-onboarding-960.webp"],
    },
    { src: cover3_4, ...metadata["covers/fruugo-merchant-onboarding.webp"] },
  ],
} as const;

export function projectCover(name: keyof typeof variants) {
  const images = variants[name];
  const display = images[3];
  const full = images[4];
  // Smaller originals can produce repeated widths; keep the first of each.
  const unique = images.filter(
    (image, index) =>
      images.findIndex((candidate) => candidate.width === image.width) ===
      index,
  );
  return {
    src: display.src,
    fullSrc: full.src,
    srcset: unique.map((image) => `${image.src} ${image.width}w`).join(", "),
    sizes:
      "(max-width: 959px) min(720px, calc(100vw - 3rem)), (max-width: 1147px) calc(100vw - 408px), 740px",
    width: display.width,
    height: display.height,
  };
}
