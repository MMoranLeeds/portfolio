import { shareStudioEnabled, shareStudioPath } from "@/config/studioRoute";
import { socialPreviewFor } from "@/config/socialPreview";
import { profile } from "@/config/profile";
import { site } from "@/config/site";
import { findProject } from "@/data/projects/index";
export function metadataFor(path: string) {
  const normalisedPath = path.replace(/\/+$/, "") || "/";
  const project = normalisedPath.startsWith("/work/")
    ? findProject(normalisedPath.slice(6))
    : undefined;
  const isCv = normalisedPath === "/cv";
  const isStudio = shareStudioEnabled && normalisedPath === shareStudioPath;
  const missing = normalisedPath !== "/" && !isCv && !isStudio && !project;
  const title = isStudio
    ? `Share image studio | ${profile.name}`
    : isCv
      ? `CV | ${profile.name} | ${profile.role}`
      : missing
        ? `Page not found | ${profile.name}`
        : project
          ? `${project.title} | ${profile.name}`
          : `${profile.name} | ${profile.role}`;
  const description = isStudio
    ? "Private portfolio image tool."
    : missing
      ? "Return to Matthew Moran's portfolio to explore case studies."
      : isCv
        ? "Matthew Moran's CV: experience in product design leadership, UX research, accessibility, design systems and frontend delivery."
        : project?.seoDescription ||
          "Matthew Moran, Lead Product Designer combining customer insight, data and accessibility, from early ideas through to implementation.";
  const canonical = new URL(
    project ? `/work/${project.slug}` : normalisedPath,
    site.origin,
  ).href;
  const jsonLd =
    missing || isStudio
      ? null
      : {
          "@context": "https://schema.org",
          "@type": project ? "CreativeWork" : "ProfilePage",
          name: title,
          description,
          url: canonical,
          ...(project
            ? {
                creator: {
                  "@type": "Person",
                  name: profile.name,
                  jobTitle: profile.role,
                },
              }
            : {
                mainEntity: {
                  "@type": "Person",
                  name: profile.name,
                  jobTitle: profile.role,
                  sameAs: [profile.linkedin],
                },
              }),
        };
  const socialPreview = socialPreviewFor(normalisedPath);
  return {
    title,
    description,
    canonical,
    robots: isStudio
      ? "noindex, nofollow, noarchive"
      : !missing && site.indexable
        ? "index, follow"
        : "noindex, follow",
    jsonLd,
    image: {
      ...socialPreview,
      url: new URL(socialPreview.path, site.origin).href,
    },
  };
}
const escapeHtml = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
export function renderHead(meta: ReturnType<typeof metadataFor>) {
  return `<title>${escapeHtml(meta.title)}</title>
<meta name="description" content="${escapeHtml(meta.description)}">
<meta name="robots" content="${meta.robots}">
<link rel="canonical" href="${escapeHtml(meta.canonical)}">
<meta property="og:title" content="${escapeHtml(meta.title)}">
<meta property="og:description" content="${escapeHtml(meta.description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${escapeHtml(meta.canonical)}">
<meta property="og:locale" content="en_GB">
<meta property="og:site_name" content="${escapeHtml(profile.name)}">
<meta property="og:image" content="${escapeHtml(meta.image.url)}">
<meta property="og:image:width" content="${meta.image.width}">
<meta property="og:image:height" content="${meta.image.height}">
<meta property="og:image:type" content="${meta.image.type}">
<meta property="og:image:alt" content="${escapeHtml(meta.image.alt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${escapeHtml(meta.image.url)}">
<meta name="twitter:image:alt" content="${escapeHtml(meta.image.alt)}">
<meta name="twitter:title" content="${escapeHtml(meta.title)}">
<meta name="twitter:description" content="${escapeHtml(meta.description)}">
${meta.jsonLd ? `<script type="application/ld+json" id="page-schema">${JSON.stringify(meta.jsonLd).replace(/</g, "\\u003c")}</script>` : ""}`;
}
export function updateDocumentMetadata(meta: ReturnType<typeof metadataFor>) {
  document.title = meta.title;
  const values = [
    ["name", "description", meta.description],
    ["name", "robots", meta.robots],
    ["property", "og:title", meta.title],
    ["property", "og:description", meta.description],
    ["property", "og:url", meta.canonical],
    ["property", "og:type", "website"],
    ["property", "og:locale", "en_GB"],
    ["property", "og:site_name", profile.name],
    ["property", "og:image", meta.image.url],
    ["property", "og:image:width", String(meta.image.width)],
    ["property", "og:image:height", String(meta.image.height)],
    ["property", "og:image:type", meta.image.type],
    ["property", "og:image:alt", meta.image.alt],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:image", meta.image.url],
    ["name", "twitter:image:alt", meta.image.alt],
    ["name", "twitter:title", meta.title],
    ["name", "twitter:description", meta.description],
  ];
  for (const [attribute, key, value] of values) {
    let element = document.querySelector<HTMLMetaElement>(
      `meta[${attribute}="${key}"]`,
    );
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attribute!, key!);
      document.head.append(element);
    }
    element.content = value!;
  }
  let canonical = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  canonical.href = meta.canonical;
  document.getElementById("page-schema")?.remove();
  if (meta.jsonLd) {
    const schema = document.createElement("script");
    schema.id = "page-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify(meta.jsonLd);
    document.head.append(schema);
  }
}
