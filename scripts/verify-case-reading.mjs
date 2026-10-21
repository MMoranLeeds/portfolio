import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { parse, compileStyle } from "@vue/compiler-sfc";
import postcss from "postcss";
import { createServer } from "vite";

const server = await createServer({ server: { middlewareMode: true } });
try {
  const assertSafeMotionCss = (css) => {
    postcss.parse(css).walkRules((rule) => {
      const hides = rule.nodes.some(
        (node) =>
          node.type === "decl" &&
          node.prop === "display" &&
          node.value.replace(/\s*!important$/, "") === "none",
      );
      if (!hides) return;
      for (const selector of rule.selector.split(",")) {
        if (selector.includes(":root")) {
          assert(
            selector.includes(".case-completion-confetti"),
            `Motion CSS must never hide the document root: ${selector}`,
          );
        }
      }
    });
  };
  // Inspect actual Vue scoped-style compilation, not just the source selector.
  const component = await readFile(
    "src/components/portfolio/CaseStudyProgress.vue",
    "utf8",
  );
  const { descriptor } = parse(component);
  for (const style of descriptor.styles) {
    const compiled = compileStyle({
      source: style.content,
      filename: "CaseStudyProgress.vue",
      id: "data-v-motion-test",
      scoped: style.scoped,
    });
    assert.equal(compiled.errors.length, 0);
    assertSafeMotionCss(compiled.code);
    assert(
      compiled.code.includes(
        ':root[data-motion="reduce"] .case-completion-confetti',
      ),
    );
    assert(
      compiled.code.includes(
        ':root:not([data-motion="full"]) .case-completion-confetti',
      ),
    );
  }
  assert.throws(() =>
    assertSafeMotionCss(':root[data-motion="reduce"] { display: none; }'),
  );
  assert.throws(() =>
    assertSafeMotionCss(
      '@media (prefers-reduced-motion: reduce) { :root:not([data-motion="full"]) { display: none; } }',
    ),
  );
  for (const name of await readdir("dist/assets")) {
    if (name.endsWith(".css"))
      assertSafeMotionCss(await readFile(`dist/assets/${name}`, "utf8"));
  }
  console.log(
    "Compiled development and production motion CSS hides only confetti, never the root.",
  );
  const {
    caseStudyReading,
    countWords,
    articleProgress,
    readingWordsPerMinute,
  } = await server.ssrLoadModule("/src/utils/caseStudyReading.ts");
  const { projects } = await server.ssrLoadModule(
    "/src/data/projects/index.ts",
  );
  const { projectPeerReviews } = await server.ssrLoadModule(
    "/src/data/peerReviews.ts",
  );
  const { confettiFrames, confettiTiming, confettiCleanupMs } =
    await server.ssrLoadModule("/src/utils/confettiMotion.ts");
  for (let index = 0; index < 20; index++) {
    for (const wide of [true, false]) {
      const frames = confettiFrames(index, wide);
      assert.equal(frames.length, 49);
      assert.equal(frames[0].opacity, 0);
      assert.equal(frames.at(-1).opacity, 0);
      const heights = frames.map((frame) =>
        Number(frame.transform.match(/translate3d\([^,]+, ([^p]+)px/)[1]),
      );
      assert(Math.min(...heights) < -60);
      assert(heights.at(-1) > 100);
      assert.equal(frames[40].opacity, 1);
      const timing = confettiTiming(index);
      assert(timing.duration + timing.delay < confettiCleanupMs);
    }
  }
  assert.equal(readingWordsPerMinute, 238);
  const { createCompletionBurst } = await server.ssrLoadModule(
    "/src/utils/completionBurst.ts",
  );
  const completion = createCompletionBurst();
  assert.equal(completion.reach(99, true), false);
  assert.equal(completion.reach(100, true), true);
  assert.equal(completion.reach(100, true), false);
  assert.equal(completion.reach(50, true), false);
  assert.equal(completion.reach(100, true), true);
  assert.equal(completion.reach(100, true), false);
  assert.equal(completion.reach(99, true), false);
  assert.equal(completion.reach(100, true), true);
  completion.reset();
  assert.equal(completion.reach(100, false), false);
  assert.equal(completion.reach(100, true), false);
  completion.reset();
  assert.equal(completion.reach(100, true), true);
  assert.equal(countWords("User-centred design, ‘research’ and 99/100."), 6);
  // Position can go back, is clamped, and reaches 100 at the article end.
  assert.equal(articleProgress(100, 2100, 0, 600), 0);
  assert.equal(articleProgress(100, 2100, 100, 600), 0);
  assert.equal(articleProgress(100, 2100, 800, 600), 50);
  assert.equal(articleProgress(100, 2100, 450, 600), 25);
  assert.equal(articleProgress(100, 2100, 1500, 600), 100);
  assert.equal(articleProgress(100, 2100, 2500, 600), 100);
  // Layout changes and short articles use the current geometry.
  assert.equal(articleProgress(100, 2800, 800, 600), 33);
  assert.equal(articleProgress(100, 2100, 800, 900), 64);
  assert.equal(articleProgress(100, 400, 0, 600), 100);
  for (const project of projects) {
    const result = caseStudyReading(project, projectPeerReviews(project.slug));
    assert(result.words > 0);
    assert.equal(result.minutes, Math.ceil(result.words / 238));
    const withMetadata = structuredClone(project);
    withMetadata.cover.alt += " extra metadata words ".repeat(1000);
    withMetadata.cover.src = "https://example.com/not-readable-copy.webp";
    assert.deepEqual(
      caseStudyReading(withMetadata, projectPeerReviews(project.slug)),
      result,
    );
    const expanded = structuredClone(project);
    expanded.sections[0].paragraphs.push("word ".repeat(238));
    assert.equal(
      caseStudyReading(expanded, projectPeerReviews(project.slug)).minutes,
      result.minutes + 1,
    );
    const html = await readFile(`dist/work/${project.slug}/index.html`, "utf8");
    assert(html.includes(`Approx. ${result.minutes} min read`));
    assert(html.includes('aria-label="Case study scroll progress"'));
    assert(html.includes('aria-valuenow="0"'));
    assert(!html.includes('class="case-completion-confetti"'));
    console.log(
      `${project.title}: ${result.words} words, approx. ${result.minutes} min read`,
    );
  }
  for (const route of [
    "dist/index.html",
    "dist/cv/index.html",
    "dist/404.html",
  ]) {
    const html = await readFile(route, "utf8");
    assert(!html.includes('aria-label="Case study scroll progress"'));
  }
  console.log(
    "Reading estimates, content changes, scroll geometry and route isolation passed.",
  );
} finally {
  await server.close();
}
