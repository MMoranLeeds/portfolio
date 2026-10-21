export interface ProjectImage {
  src: string;
  srcset?: string;
  sizes?: string;
  fullSrc?: string;
  label?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** Optional crop for long screenshots; the lightbox still shows the full image. */
  previewAspectRatio?: string;
  previewPosition?: string;
  previewMaxWidth?: string;
}
export interface ProjectCover extends ProjectImage {
  /** Optimised background URL for this project's homepage card only. */
  cardBackground?: string;
}
export interface ProjectSection {
  id: string;
  title: string;
  paragraphs: string[];
  image?: ProjectImage;
  blocks?: ProjectContentBlock[];
  eyebrow?: string;
  points?: ProjectPoint[];
  steps?: ProjectPoint[];
  evidence?: ProjectEvidence[];
  sourceIds?: string[];
}
export interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  status: string;
  tags: string[];
  url?: string;
  externalLinkLabel?: string;
  sourcesIntro?: string;
  seoDescription: string;
  cover: ProjectCover;
  overview?: CaseStudyOverview;
  mobile?: ProjectMobileConfig;
  card?: ProjectCardConfig;
  video?: ProjectVideo;
  socialPreview?: SocialPreview;
  sections: ProjectSection[];
  sources?: ProjectSource[];
}

export interface ProjectPoint {
  title: string;
  description: string;
}
export interface ProjectEvidence {
  value: string;
  label: string;
  detail: string;
  sourceId?: string;
}
export interface ProjectSource {
  id: string;
  publisher: string;
  title: string;
  url?: string;
  date: string;
  note: string;
}

export interface ProjectContentBlock {
  id: string;
  title: string;
  paragraphs: string[];
  images?: ProjectImage[];
  imageLayout?: "grid";
  placeholder?: { title: string; description: string };
}

export interface ProjectMobileConfig {
  fallbackSrc: string;
  label: string;
  alt: string;
  caption: string;
}

export interface ProjectCardConfig {
  alt?: string;
  /** Override header presentation when it should reuse the card screenshot. */
  header?: Partial<ProjectImage>;
}

export interface CaseStudyOverview {
  outcome: string;
  period: string;
  launchDate?: string;
  launchLabel?: string;
}

export interface ProjectVideo {
  id?: string;
  sectionId: string;
  title: string;
  src: string;
  poster: string;
  caption: string;
  paragraphs?: string[];
  playLabel?: string;
  width: number;
  height: number;
  captionsSrc?: string;
  transcript?: string[];
}

export interface SocialPreview {
  path: string;
  width: number;
  height: number;
  type: "image/png" | "image/jpeg";
  alt: string;
}
