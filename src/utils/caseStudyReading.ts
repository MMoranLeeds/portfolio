import type { Project, ProjectImage } from "@/types/project";
import type { PeerReview } from "@/data/peerReviews";
import { projectMobilePreview } from "@/data/projects/shared/mobilePreview";
import { projectHeaderImage } from "@/data/projects/shared/cardImages";
import { projectVideoTranscripts } from "@/data/projects/generated/videoTranscripts";

// Brysbaert (2019), English non-fiction silent reading, 190 studies.
// Public research summary: https://biblio.ugent.be/publication/8647789
export const readingWordsPerMinute = 238;

export function countWords(text: string): number {
  return (text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
}

/** Count displayed article copy, excluding navigation, URLs, alt text and IDs. */
export function caseStudyReading(project: Project, reviews: PeerReview[] = []) {
  const video = project.video;
  const overview = project.overview;
  const transcriptKey =
    video?.src
      .split("/")
      .pop()
      ?.split(/[?#]/)[0]
      ?.replace(/\.mp4$/i, "") || "";
  const transcript = video?.transcript?.length
    ? video.transcript
    : projectVideoTranscripts[transcriptKey]?.transcript || [];
  const text: string[] = [
    ...(overview
      ? [
          "At a glance",
          overview.outcome,
          "Project period",
          overview.period,
          ...(overview.launchLabel ? ["Launched", overview.launchLabel] : []),
        ]
      : []),
    ...(video
      ? [video.title, video.caption, ...(video.paragraphs || []), ...transcript]
      : []),
    project.category,
    project.title,
    project.summary,
    "My role",
    project.role,
    "Status",
    project.status,
  ];
  if (project.url)
    text.push(project.externalLinkLabel || `Visit ${project.title}`);
  const imageText = (image?: ProjectImage) => {
    if (image) text.push(image.label || "", image.caption);
  };
  imageText(projectHeaderImage(project));
  imageText(projectMobilePreview(project));
  for (const section of project.sections) {
    text.push(section.eyebrow || "", section.title, ...section.paragraphs);
    for (const item of section.evidence || [])
      text.push(item.value, item.label, item.detail);
    for (const item of [...(section.points || []), ...(section.steps || [])])
      text.push(item.title, item.description);
    if (section.sourceIds?.length) {
      text.push("Further reading");
      for (const id of section.sourceIds)
        text.push(
          project.sources?.find((source) => source.id === id)?.publisher ||
            "Source",
        );
    }
    for (const block of section.blocks || []) {
      text.push(block.title, ...block.paragraphs);
      if (block.placeholder)
        text.push(block.placeholder.title, block.placeholder.description);
      for (const image of block.images || []) imageText(image);
    }
    imageText(section.image);
  }
  if (reviews.length)
    text.push(
      "Working together on this project",
      "Recent feedback from colleagues and my manager on design, leadership and collaboration.",
    );
  for (const review of reviews) {
    text.push(
      review.theme || "",
      review.quote,
      review.name,
      review.role,
      review.context || "",
    );
    if (review.additionalQuote)
      text.push(
        "Mentoring and development",
        review.additionalQuote,
        review.additionalContext || "",
      );
  }
  if (project.sources?.length) {
    text.push(
      "Sources and evidence",
      project.sourcesIntro ||
        "Public research accessed 12 October 2026. These are published reports, not open raw datasets. Project delivery is described from my contribution and project notes; proposed capabilities are labelled separately.",
    );
    for (const source of project.sources)
      text.push(source.publisher, source.date, source.title, source.note);
  }
  const words = countWords(text.join(" "));
  return {
    words,
    minutes: Math.max(1, Math.ceil(words / readingWordsPerMinute)),
  };
}

/** Reading position, zero at the article start, complete when its end is visible. */
export function articleProgress(
  start: number,
  end: number,
  scrollY: number,
  viewportHeight: number,
): number {
  const distance = end - start - viewportHeight;
  if (distance <= 0) return scrollY + viewportHeight >= end ? 100 : 0;
  return Math.round(
    Math.max(0, Math.min(1, (scrollY - start) / distance)) * 100,
  );
}
