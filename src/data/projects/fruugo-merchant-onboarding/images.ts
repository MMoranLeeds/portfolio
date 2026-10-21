import type { ProjectImage } from "@/types/project";
import small0 from "@/assets/images/dist/onboarding/before-products-320.webp";
import medium0 from "@/assets/images/dist/onboarding/before-products-640.webp";
import large0 from "@/assets/images/dist/onboarding/before-products-960.webp";
import full0 from "@/assets/images/dist/onboarding/before-products.webp";
import small1 from "@/assets/images/dist/onboarding/before-payment-320.webp";
import medium1 from "@/assets/images/dist/onboarding/before-payment-640.webp";
import large1 from "@/assets/images/dist/onboarding/before-payment-960.webp";
import full1 from "@/assets/images/dist/onboarding/before-payment.webp";
import small2 from "@/assets/images/dist/onboarding/after-brands-320.webp";
import medium2 from "@/assets/images/dist/onboarding/after-brands-640.webp";
import large2 from "@/assets/images/dist/onboarding/after-brands-960.webp";
import full2 from "@/assets/images/dist/onboarding/after-brands.webp";
import small3 from "@/assets/images/dist/onboarding/after-bank-routing-320.webp";
import medium3 from "@/assets/images/dist/onboarding/after-bank-routing-640.webp";
import large3 from "@/assets/images/dist/onboarding/after-bank-routing-960.webp";
import full3 from "@/assets/images/dist/onboarding/after-bank-routing.webp";
import small4 from "@/assets/images/dist/onboarding/after-document-guidance-320.webp";
import medium4 from "@/assets/images/dist/onboarding/after-document-guidance-640.webp";
import large4 from "@/assets/images/dist/onboarding/after-document-guidance-960.webp";
import full4 from "@/assets/images/dist/onboarding/after-document-guidance.webp";

const images = {
  "before-products": {
    small: small0,
    medium: medium0,
    large: large0,
    full: full0,
    width: 1600,
    height: 741,
  },
  "before-payment": {
    small: small1,
    medium: medium1,
    large: large1,
    full: full1,
    width: 1600,
    height: 685,
  },
  "after-brands": {
    small: small2,
    medium: medium2,
    large: large2,
    full: full2,
    width: 1500,
    height: 1009,
  },
  "after-bank-routing": {
    small: small3,
    medium: medium3,
    large: large3,
    full: full3,
    width: 1500,
    height: 490,
  },
  "after-document-guidance": {
    small: small4,
    medium: medium4,
    large: large4,
    full: full4,
    width: 1500,
    height: 810,
  },
} as const;

export function onboardingImage(
  name: keyof typeof images,
  label: string,
  alt: string,
  caption: string,
): ProjectImage {
  const image = images[name];
  return {
    src: image.large,
    fullSrc: image.full,
    srcset: `${image.small} 320w, ${image.medium} 640w, ${image.large} 960w, ${image.full} ${image.width}w`,
    sizes:
      "(max-width: 959px) min(720px, calc(100vw - 3rem)), (max-width: 1147px) calc(100vw - 408px), 740px",
    width: image.width,
    height: image.height,
    label,
    alt,
    caption,
  };
}
