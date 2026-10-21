import { profile } from "@/config/profile";
import { projects } from "@/data/projects/index";
import chat from "@/assets/images/dist/huugo/chat.webp";
import search from "@/assets/images/dist/accessible-trades/search-results.webp";
import onboarding from "@/assets/images/dist/onboarding/after-document-guidance.webp";

// Add or replace local imports here. File picker overrides last for this session only.
export const studioImages = [
  {
    id: "accessible-trades-search",
    label: "Accessible Trades · search",
    src: search,
  },
  { id: "huugo-chat", label: "Huugo · shopping conversation", src: chat },
  {
    id: "merchant-documents",
    label: "Merchant onboarding · documents",
    src: onboarding,
  },
  ...projects.map((project) => ({
    id: project.slug,
    label: `${project.title} · cover`,
    src: project.cover.fullSrc || project.cover.src,
  })),
];
export const studioDefaults = {
  name: profile.name,
  role: profile.role,
  headline: "Research.\nDesign.\nDelivery.",
  width: 1200,
  height: 630,
  cards: [
    {
      imageId: "huugo-from-fruugo",
      x: 450,
      y: 150,
      width: 470,
      height: 440,
      angle: -4,
      focusX: 50,
      focusY: 45,
    },
    {
      imageId: "accessible-trades",
      x: 810,
      y: 40,
      width: 375,
      height: 270,
      angle: 5,
      focusX: 50,
      focusY: 50,
    },
    {
      imageId: "merchant-documents",
      x: 865,
      y: 355,
      width: 320,
      height: 240,
      angle: 4,
      focusX: 50,
      focusY: 50,
    },
  ],
};

// Case-study copy and crop defaults are editable here; the UI can override them.
export const studioCaseStudies = projects.map((project) => ({
  slug: project.slug,
  headline: project.title,
  role: project.category,
  imageId: project.slug,
  focusX: 50,
  focusY: 50,
}));
export const caseStudyLayout = {
  x: 505,
  y: 95,
  width: 645,
  height: 440,
  angle: 0,
};

export const studioTemplates = {
  standard: { width: 1200, height: 630, filename: "portfolio-social-preview" },
  "case-study": { width: 1200, height: 630, filename: "case-study" },
  linkedin: {
    width: 1584,
    height: 396,
    filename: "matthew-moran-linkedin-header",
  },
};
export type StudioTemplate = keyof typeof studioTemplates;
export const linkedinDefaults = {
  headline: "Turning customer insights\ninto clear, accessible products.",
  supportingLine: "Research · Accessibility · Design systems",
};
