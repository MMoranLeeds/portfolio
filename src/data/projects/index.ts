import type { Project } from "@/types/project";
import { localisationProject } from "./fruugo-localisation";
import { onboardingProject } from "./fruugo-merchant-onboarding";
import { huugoProject } from "./huugo-from-fruugo";
import { accessibleTradesProject } from "./accessible-trades";
import { nextRambleAndroidProject } from "./nextramble-android";
import { nextRambleProject } from "./nextramble";
import { cookieConsentProject } from "./fruugo-cookie-consent";

import { designSystemProject } from "./design-system-integration";

// One ordered registry drives cards, routes, next-study links and prerendering.
export const projects: Project[] = [
  cookieConsentProject,
  designSystemProject,
  onboardingProject,
  huugoProject,
  localisationProject,
  accessibleTradesProject,
  nextRambleProject,
  nextRambleAndroidProject,
];

export const findProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
