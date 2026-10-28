import type { Project } from "@/types/project";
import { localisationProject } from "./fruugo-localisation";
import { onboardingProject } from "./fruugo-merchant-onboarding";
import { huugoProject } from "./huugo-from-fruugo";
import { accessibleTradesProject } from "./accessible-trades";
import { nextRambleProject } from "./nextramble";
import { cookieConsentProject } from "./fruugo-cookie-consent";

// One ordered registry drives cards, routes, next-study links and prerendering.
export const projects: Project[] = [
  localisationProject,
  cookieConsentProject,
  onboardingProject,
  huugoProject,
  accessibleTradesProject,
  nextRambleProject,
];

export const findProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
