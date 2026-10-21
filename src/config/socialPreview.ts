import { findProject } from "@/data/projects/index";
import type { SocialPreview } from "@/types/project";

// Default for the homepage, CV and routes without a dedicated preview.
// Case-study previews belong to each project's socialPreview configuration.
export const socialPreview: SocialPreview = {
  path: "/images/portfolio-social-preview.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Matthew Moran, Lead Product Designer portfolio.",
};

export function socialPreviewFor(path: string): SocialPreview {
  const normalised = path.replace(/\/+$/, "") || "/";
  const project = normalised.startsWith("/work/")
    ? findProject(normalised.slice(6))
    : undefined;
  return project?.socialPreview || socialPreview;
}
