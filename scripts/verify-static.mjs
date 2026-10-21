import assert from "node:assert/strict";
import sharp from "sharp";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
const sitemap = await readFile("dist/sitemap.xml", "utf8");
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
  match[1].replace(/&amp;/g, "&"),
);
assert(
  locations.length >= 5,
  "Homepage and all four case studies must be generated",
);
const titles = new Set();
const caseImages = new Set();
for (const location of locations) {
  const path = new URL(location).pathname;
  const html = await readFile(
    path === "/" ? "dist/index.html" : `dist${path}/index.html`,
    "utf8",
  );
  assert(
    html.includes('src="/theme-init.js"'),
    "Every route must apply the theme before painting",
  );
  assert(
    !html.includes("<!--app-html-->"),
    "Page must contain rendered content",
  );
  assert.equal(
    [...html.matchAll(/<h1(?:\s|>)/g)].length,
    1,
    "Exactly one H1 per page",
  );
  assert(
    html.includes('id="main-content"'),
    "Main content landmark must be present",
  );
  assert(
    html.includes(`rel="canonical" href="${location}"`),
    "Canonical must match sitemap",
  );
  const imageUrl = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  assert(imageUrl, "Every page needs an Open Graph image");
  assert.equal(new URL(imageUrl).origin, new URL(location).origin);
  if (path.startsWith("/work/")) {
    assert(
      !caseImages.has(imageUrl),
      "Case studies need distinct share images",
    );
    caseImages.add(imageUrl);
  }
  assert(html.includes(`property="og:image" content="${imageUrl}"`));
  assert(html.includes(`name="twitter:image" content="${imageUrl}"`));
  assert(html.includes('name="twitter:card" content="summary_large_image"'));
  assert(html.includes('property="og:image:width" content="1200"'));
  assert(html.includes('property="og:image:height" content="630"'));
  assert(html.includes('property="og:image:alt"'));
  await access(resolve(`dist${new URL(imageUrl).pathname}`));
  const socialSize = await sharp(
    resolve(`dist${new URL(imageUrl).pathname}`),
  ).metadata();
  assert.equal(socialSize.width, 1200);
  assert.equal(socialSize.height, 630);
  assert(
    html.includes("application/ld+json"),
    "Structured data must be rendered",
  );
  for (const tag of ["description", "robots", "twitter:card"])
    assert(html.includes(`name="${tag}"`));
  const title = html.match(/<title>(.*?)<\/title>/)[1];
  assert(!titles.has(title), "Titles must be unique");
  titles.add(title);
  for (const match of html.matchAll(
    /(?:src|href)="(\/(?:assets|images)\/[^"?#]+)"/g,
  )) {
    await access(resolve(`dist${match[1]}`));
  }
  if (path.startsWith("/work/")) {
    assert(
      html.includes("The problem"),
      "Case-study text must be readable without JavaScript",
    );
    assert(
      html.includes("Back to case studies"),
      "Case study needs a return link",
    );
    assert(
      html.includes('href="/#case-studies"'),
      "Return link must target the homepage grid",
    );
  }
  console.log(`Static HTML verified: ${path}`);
}
const notFound = await readFile("dist/404.html", "utf8");
assert(
  notFound.includes("noindex, follow"),
  "404 page must be excluded from indexing",
);
assert(notFound.includes("This page seems to have wandered off."));
await access(resolve("dist/theme-init.js"));
const homepage = await readFile("dist/index.html", "utf8");
const homepageSections = [
  "introduction",
  "case-studies",
  "user-research-and-insights",
  "accessibility-and-systems",
  "leadership-and-collaboration",
  "ai-and-modern-workflows",
  "testimonials-and-experience",
  "contact",
];
let previousSectionPosition = -1;
for (const id of homepageSections) {
  const position = homepage.indexOf(`id="${id}"`);
  assert(
    position > previousSectionPosition,
    `Section order or target missing: ${id}`,
  );
  assert(homepage.includes(`href="/#${id}"`), `Navigation link missing: ${id}`);
  previousSectionPosition = position;
}
const cvHtml = await readFile("dist/cv/index.html", "utf8");
assert(cvHtml.includes("Print / save as PDF"));
assert(cvHtml.includes("networx Recruitment"));
assert(cvHtml.includes("Becky Lovell"));
assert(cvHtml.includes("LinkedIn recommendation, 22 July 2026"));
assert(
  cvHtml.includes(
    "Beyond being an exceptional designer, Matt has been an incredible mentor.",
  ),
);
assert.equal(
  [...cvHtml.matchAll(/<figure class="cv-recommendation"/g)].length,
  1,
);
assert(cvHtml.includes("Incommunities Housing Association"));
assert(
  !cvHtml.includes('class="app-shell"'),
  "CV must use its own print layout",
);
assert(
  homepage.includes('href="/cv"'),
  "Portfolio must link to the generated CV",
);
assert(homepage.includes('aria-controls="preferences-panel"'));
assert(homepage.includes('<dialog id="preferences-panel"'));
assert(homepage.includes('id="portfolio-motion"'));
assert(!homepage.includes('popovertarget="appearance-panel"'));
assert(homepage.includes('class="appearance-utility"'));
assert(!homepage.includes("https://www.linkedin.com/in/becky-lovell/"));
for (const name of ["Becky Lovell", "Kieran Lynch", "Ryan Duncan", "Huw Evans"])
  assert(homepage.includes(name));
assert(homepage.includes("LinkedIn recommendation, July 2026"));
assert(!homepage.includes("More feedback on mentoring"));
assert(homepage.includes("Matt is a dedicated mentor"));
assert(homepage.includes("Performance review, 2026"));
assert(homepage.includes("identity-focus"));
assert(!homepage.includes("sidebar-note"));
assert(!homepage.includes("fruugo.slack.com"));
assert(!homepage.includes('class="theme-options"'));
assert(
  homepage.includes("Testimonials"),
  "The supplied 2026 feedback must be published",
);
assert(
  homepage.includes('href="/work/accessible-trades"'),
  "Cards must link to their case study",
);
const huugo = await readFile("dist/work/huugo-from-fruugo/index.html", "utf8");
assert(homepage.includes('href="/work/huugo-from-fruugo"'));
assert(!homepage.includes("Putting this into practice: Huugo from Fruugo"));
assert(huugo.includes("From character design to an agent-supported workflow"));
assert(huugo.includes("Proposed next phase"));
assert(huugo.includes("front-end implementation"));
assert(huugo.includes("The problem"));
for (const match of huugo.matchAll(/href="#(source-[^"]+)"/g)) {
  assert(huugo.includes(`id="${match[1]}"`), "Source links must resolve");
}
assert(sitemap.includes("/work/huugo-from-fruugo"));
const localisation = await readFile(
  "dist/work/fruugo-localisation/index.html",
  "utf8",
);
assert(homepage.includes('href="/work/fruugo-localisation"'));
assert(localisation.includes("Website visits in 2025"));
assert(localisation.includes("300m"));
assert(localisation.includes("Retailers on the marketplace"));
assert(localisation.includes("4,500+"));
assert(localisation.includes("Screenshots per language"));
assert(localisation.includes("awaiting deployment"));
assert(localisation.includes("Puppeteer"));
assert(!localisation.includes("Playwright"));
assert(
  localisation.includes(
    "Personal language choice · awaiting production deployment",
  ),
);
assert(localisation.includes("Simplified Chinese · after language change"));
assert(!localisation.includes("Interface preview to follow"));
assert(localisation.includes("E-Mail sicheres Abmelden"));
assert(localisation.includes("Angemeldet als"));
assert(!localisation.includes("not independently verified release completion"));
assert(!localisation.includes("atlassian.net"));
assert(!localisation.includes("fruugo.slack.com"));
for (const match of localisation.matchAll(/href="#(source-[^"]+)"/g)) {
  assert(
    localisation.includes(`id="${match[1]}"`),
    "Source links must resolve",
  );
}
assert(sitemap.includes("/work/fruugo-localisation"));
console.log(
  "All generated routes, content, metadata, links and image paths passed.",
);

const onboarding = await readFile(
  "dist/work/fruugo-merchant-onboarding/index.html",
  "utf8",
);
assert(homepage.includes('href="/work/fruugo-merchant-onboarding"'));
assert(
  homepage.includes(
    "Turning customer insights into clear, accessible products.",
  ),
);
assert(homepage.includes("internal checkout testing"));
assert(sitemap.includes("/work/fruugo-merchant-onboarding"));
for (const text of [
  "24 responses",
  "4.5 / 5",
  "4.3 / 5",
  "8m 7s",
  "Fastest observed submission",
  "Monday.com",
  "Salesforce",
]) {
  assert(onboarding.includes(text), `Onboarding evidence missing: ${text}`);
}
assert(onboarding.includes("rather than an average"));
assert(!onboarding.includes("60%"));
assert(!onboarding.includes('id="case-sources"'));
assert(!onboarding.includes('href="#source-'));
console.log(
  "Fourth case study, early-results qualifications and updated positioning passed.",
);

const sectionIds = [...onboarding.matchAll(/<h2 id="case-([^"]+)"/g)]
  .map((match) => match[1])
  .filter((id) => id !== "outcome-title");
assert.deepEqual(sectionIds.slice(0, 7), [
  "problem",
  "contribution",
  "research",
  "decisions",
  "validation",
  "delivery",
  "learning",
]);
const screenshots = [
  ...onboarding.matchAll(/<img\b[^>]*srcset="([^"]+)"[^>]*>/g),
].filter(
  (match) =>
    !match[0].includes('class="project-cover-image"') &&
    /before-products|before-payment|after-brands|after-bank-routing|after-document-guidance/.test(
      match[0],
    ),
);
assert.equal(
  screenshots.length,
  5,
  "Five selected research/design screenshots must render statically",
);
for (const [tag, srcset] of screenshots) {
  assert(tag.includes('loading="lazy"'));
  assert(tag.includes('sizes="'));
  assert(!tag.includes(".png"));
  const candidates = srcset.split(",").map((item) => item.trim().split(/\s+/));
  assert.equal(candidates.length, 4);
  for (const [url, descriptor] of candidates) {
    assert(url.startsWith("/assets/"));
    const metadata = await sharp(resolve(`dist${url}`)).metadata();
    assert.equal(metadata.format, "webp");
    assert.equal(
      metadata.width,
      Number(descriptor.replace("w", "")),
      "srcset descriptors must match actual generated widths",
    );
  }
}
assert(onboarding.includes("After · Figma design"));
console.log(
  "Seven-section onboarding structure and five responsive WebP figures passed.",
);

// Verify what browsers receive, including full-size figure links and srcset files.
for (const location of locations) {
  const route = new URL(location).pathname;
  const html = await readFile(
    route === "/" ? "dist/index.html" : `dist${route}/index.html`,
    "utf8",
  );
  const imageTags = [...html.matchAll(/<img\b[^>]*>/g)].map(
    (match) => match[0],
  );
  assert(
    imageTags.every((tag) => !/src="[^"]+\.(png|jpe?g)(?:[?"])/i.test(tag)),
    "Rendered routes must use optimised raster images",
  );
  assert(
    !/<a\b[^>]*href="[^"]+\.(png|jpe?g)(?:[?"])/i.test(html),
    "Full-size image links must not request raster originals",
  );
  const covers = imageTags.filter(
    (tag) =>
      !tag.includes('class="mobile-preview-image"') &&
      (route === "/"
        ? tag.includes("project-card-screenshot")
        : tag.includes('class="project-cover-image"')),
  );
  assert.equal(covers.length, route === "/" ? 4 : route === "/cv" ? 0 : 1);
  for (const tag of covers) {
    assert(tag.includes('sizes="'));
    assert(tag.includes('width="') && tag.includes('height="'));
    assert(tag.includes(route === "/" ? 'loading="lazy"' : 'loading="eager"'));
    assert.equal(tag.includes('fetchpriority="high"'), route !== "/");
    const candidates = tag
      .match(/srcset="([^"]+)"/)[1]
      .split(",")
      .map((item) => item.trim().split(/\s+/));
    assert(
      candidates.length >= 4,
      "Responsive card and cover variants must be present",
    );
    for (const [url, descriptor] of candidates) {
      const info = await sharp(resolve(`dist${url}`)).metadata();
      assert.equal(info.format, "webp");
      assert.equal(info.width, Number(descriptor.slice(0, -1)));
    }
  }
  if (route.startsWith("/work/"))
    assert.equal(
      imageTags.filter((tag) => tag.includes('fetchpriority="high"')).length,
      1,
      "Only the case-study opening image should have high priority",
    );
}
console.log(
  "All four card covers and case-study heroes use responsive WebP with correct dimensions and loading priority.",
);

for (const location of locations.filter((location) =>
  new URL(location).pathname.startsWith("/work/"),
)) {
  const html = await readFile(
    `dist${new URL(location).pathname}/index.html`,
    "utf8",
  );
  const dialogs = [
    ...html.matchAll(/<dialog\b[^>]*>[\s\S]*?<\/dialog>/g),
  ].filter((match) =>
    match[0].includes('aria-labelledby="image-lightbox-title"'),
  );
  assert.equal(
    dialogs.length,
    1,
    "Each case study must have one shared image viewer",
  );
  assert(dialogs[0][0].includes('aria-labelledby="image-lightbox-title"'));
  assert(
    !dialogs[0][0].includes("<img"),
    "No enlarged-image request should exist before interaction",
  );
  assert(!dialogs[0][0].match(/<dialog\b[^>]*\sopen(?:[\s=>])/));
  assert(html.includes('class="project-image-trigger"'));
  assert(
    html.includes("Open full-size image:"),
    "Static pages retain full-size links without JavaScript",
  );
}
console.log(
  "Shared closed native dialogs, deferred enlarged images and static link fallback passed.",
);
