import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { createServer } from "vite";
import { createRouter, createMemoryHistory } from "vue-router";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";

const bootstrap = await readFile("public/theme-init.js", "utf8");
function environment(
  saved,
  dark,
  storageBlocked = false,
  motionSaved = null,
  reduced = false,
) {
  const listeners = new Map();
  const mediaListeners = new Map();
  const motionListeners = new Map();
  const media = {
    matches: dark,
    addEventListener: (name, handler) => mediaListeners.set(name, handler),
  };
  const motionMedia = {
    matches: reduced,
    addEventListener: (name, handler) => motionListeners.set(name, handler),
  };
  const root = { dataset: {}, style: {} };
  let persisted = saved;
  let persistedMotion = motionSaved;
  const window = {
    matchMedia: (query) =>
      query.includes("reduced-motion") ? motionMedia : media,
    localStorage: {
      getItem: (key) => {
        if (storageBlocked) throw new Error("Unavailable");
        return key === "portfolio-motion" ? persistedMotion : persisted;
      },
      setItem: (key, value) => {
        if (storageBlocked) throw new Error("Unavailable");
        if (key === "portfolio-motion") persistedMotion = value;
        else persisted = value;
      },
    },
    addEventListener: (name, handler) =>
      listeners.set(name, [...(listeners.get(name) || []), handler]),
    dispatchEvent: () => {},
  };
  vm.runInNewContext(bootstrap, {
    window,
    document: {
      documentElement: root,
      querySelector: () => ({ setAttribute: () => {} }),
    },
    Event,
  });
  const storageEvent = (key, value) => {
    for (const handler of listeners.get("storage") || [])
      handler({ key, newValue: value });
  };
  return {
    window,
    root,
    get persisted() {
      return persisted;
    },
    get persistedMotion() {
      return persistedMotion;
    },
    changeSystem(value) {
      media.matches = value;
      mediaListeners.get("change")();
    },
    changeMotion(value) {
      motionMedia.matches = value;
      motionListeners.get("change")();
    },
    storage(value) {
      storageEvent("portfolio-theme", value);
    },
    motionStorage(value) {
      storageEvent("portfolio-motion", value);
    },
    clearStorage() {
      storageEvent(null, null);
    },
  };
}
for (const [saved, systemDark, expected] of [
  [null, true, "dark"],
  [null, false, "light"],
  ["light", true, "light"],
  ["dark", false, "dark"],
  ["invalid", true, "dark"],
]) {
  const env = environment(saved, systemDark);
  assert.equal(
    env.root.dataset.theme,
    expected,
    "Saved preference must override the system at bootstrap",
  );
}
const env = environment(null, true);
env.changeSystem(false);
assert.equal(env.root.dataset.theme, "light");
env.window.portfolioTheme.setPreference("dark");
assert.equal(env.persisted, "dark");
env.changeSystem(false);
assert.equal(env.root.dataset.theme, "dark");
env.window.portfolioTheme.setPreference("system");
assert.equal(env.root.dataset.theme, "light");
env.changeSystem(true);
assert.equal(env.root.dataset.theme, "dark");
env.storage("light");
assert.equal(env.root.dataset.theme, "light");
env.storage(null);
assert.equal(env.root.dataset.themePreference, "system");
const blocked = environment(null, true, true);
blocked.window.portfolioTheme.setPreference("light");
assert.equal(blocked.root.dataset.theme, "light");
console.log(
  "Theme bootstrap, persistence, system changes, storage events and blocked storage passed.",
);

for (const [saved, systemReduced, expected] of [
  [null, true, "reduce"],
  [null, false, "full"],
  ["reduce", false, "reduce"],
  ["full", true, "full"],
  ["invalid", true, "reduce"],
]) {
  const test = environment("dark", false, false, saved, systemReduced);
  assert.equal(
    test.root.dataset.motion,
    expected,
    "Motion must resolve before paint",
  );
  assert.equal(
    test.root.dataset.theme,
    "dark",
    "Motion must not change the theme",
  );
}
const motion = environment("light", true, false, null, true);
motion.changeMotion(false);
assert.equal(motion.root.dataset.motion, "full");
motion.window.portfolioMotion.setPreference("reduce");
assert.equal(motion.persistedMotion, "reduce");
motion.changeMotion(false);
assert.equal(motion.root.dataset.motion, "reduce");
motion.window.portfolioMotion.setPreference("full");
motion.changeMotion(true);
assert.equal(motion.root.dataset.motion, "full");
motion.window.portfolioMotion.setPreference("system");
assert.equal(motion.root.dataset.motion, "reduce");
motion.motionStorage("full");
assert.equal(motion.root.dataset.motion, "full");
assert.equal(motion.root.dataset.theme, "light");
motion.window.portfolioMotion.setPreference("invalid");
assert.equal(motion.root.dataset.motion, "full");
motion.motionStorage(null);
assert.equal(motion.root.dataset.motionPreference, "system");
motion.clearStorage();
assert.equal(motion.root.dataset.motionPreference, "system");
assert.equal(motion.root.dataset.themePreference, "system");
const blockedMotion = environment(null, false, true, null, true);
blockedMotion.window.portfolioMotion.setPreference("full");
assert.equal(blockedMotion.root.dataset.motion, "full");
console.log(
  "Motion bootstrap, saved overrides, live system changes, cross-tab updates, independent settings and blocked storage passed.",
);

const css = await readFile("src/assets/styles/tokens.css", "utf8");
const palette = (block) =>
  Object.fromEntries(
    [...block.matchAll(/--([a-z-]+):\s*(#[0-9a-f]+)/g)].map((m) => [
      m[1],
      m[2],
    ]),
  );
const light = palette(css.slice(css.indexOf(":root {"), css.indexOf("/*")));
const dark = palette(css.slice(css.indexOf(":root[data-theme=")));
function luminance(hex) {
  let value = hex.slice(1);
  if (value.length === 3) value = [...value].map((c) => c + c).join("");
  const rgb = [0, 2, 4]
    .map((offset) => parseInt(value.slice(offset, offset + 2), 16) / 255)
    .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}
const contrast = (a, b) =>
  (Math.max(luminance(a), luminance(b)) + 0.05) /
  (Math.min(luminance(a), luminance(b)) + 0.05);
for (const colors of [light, dark]) {
  for (const foreground of ["ink", "text", "muted", "accent"]) {
    for (const background of [
      "surface",
      "sidebar",
      "panel",
      "soft-surface",
      "hover-surface",
    ]) {
      assert(
        contrast(colors[foreground], colors[background]) >= 4.5,
        `${foreground} on ${background} requires readable contrast`,
      );
    }
  }
  assert(contrast(colors["action-text"], colors["action-bg"]) >= 4.5);
  assert(contrast(colors["action-text"], colors["action-hover"]) >= 4.5);
  assert(contrast(colors["tooltip-text"], colors["tooltip-bg"]) >= 4.5);
  assert(contrast(colors.focus, colors.surface) >= 3);
}
console.log(
  "Light and dark text, action, tooltip and focus token contrast passed.",
);

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { syncSectionHash, isPendingSectionSync } = await server.ssrLoadModule(
    "/src/router/sectionSync.ts",
  );
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", name: "home", component: {} },
      { path: "/work/:slug", name: "case-study", component: {} },
    ],
  });
  router.beforeEach((to) => {
    if (isPendingSectionSync(router, to.fullPath))
      to.meta.sectionScrollSync = true;
  });
  await router.push("/?campaign=example#introduction");
  await syncSectionHash(router, "accessibility-and-systems");
  assert.equal(
    router.currentRoute.value.fullPath,
    "/?campaign=example#accessibility-and-systems",
  );
  assert.equal(router.currentRoute.value.meta.sectionScrollSync, true);
  await router.push("/?campaign=example#leadership-and-collaboration");
  assert.equal(
    router.currentRoute.value.meta.sectionScrollSync,
    undefined,
    "Explicit navigation must not inherit a passive marker",
  );
  await router.push("/work/huugo-from-fruugo");
  await syncSectionHash(router, "contact");
  assert.equal(
    router.currentRoute.value.fullPath,
    "/work/huugo-from-fruugo",
    "Scroll syncing must never overwrite project URLs",
  );
  console.log(
    "Section replacements, query preservation, transient markers and case-study isolation passed.",
  );
  const reviews = await server.ssrLoadModule("/src/data/peerReviews.ts");
  const { default: PeerReviews } = await server.ssrLoadModule(
    "/src/components/portfolio/PeerReviews.vue",
  );
  const original = [...reviews.peerReviews];
  try {
    const empty = await renderToString(
      createSSRApp({ render: () => h(PeerReviews, { reviews: [] }) }),
    );
    assert(
      !empty.includes("Testimonials"),
      "An empty review list must have no visible section",
    );
    reviews.peerReviews.splice(0, reviews.peerReviews.length);
    reviews.peerReviews.push(
      {
        id: "test-one",
        quote:
          "A synthetic test excerpt, never included in the public review data.",
        additionalQuote: "A separate mentoring excerpt.",
        additionalContext: "Separate source",
        name: "Test reviewer",
        role: "Test role",
        featured: true,
        projectSlug: "huugo-from-fruugo",
      },
      {
        id: "test-two",
        quote: "Second test excerpt.",
        name: "Test reviewer two",
        role: "Test role",
        featured: true,
      },
      {
        id: "test-three",
        quote: "Third test excerpt.",
        name: "Test reviewer three",
        role: "Test role",
        featured: true,
        projectSlug: "fruugo-localisation",
      },
    );
    reviews.peerReviews.push({
      id: "test-four",
      quote: "Manager excerpt.",
      name: "Test manager",
      role: "Manager",
      featured: true,
    });
    assert.equal(reviews.featuredPeerReviews().length, 4);
    assert.equal(reviews.projectPeerReviews("huugo-from-fruugo").length, 1);
    assert.equal(reviews.projectPeerReviews("accessible-trades").length, 0);
    const html = await renderToString(
      createSSRApp({
        render: () =>
          h(PeerReviews, { reviews: reviews.featuredPeerReviews() }),
      }),
    );
    assert(html.includes("<blockquote>"));
    assert(html.includes("A separate mentoring excerpt."));
    assert(html.includes("Separate source"));
    assert(html.includes("Test manager"));
    assert(!html.includes("<details"));
    assert(html.includes("Test reviewer"));
    assert(
      html.includes(
        "A synthetic test excerpt, never included in the public review data.",
      ),
    );
    console.log(
      "Empty review state, attribution, verbatim excerpt rendering and project selection passed.",
    );
  } finally {
    reviews.peerReviews.splice(0, reviews.peerReviews.length, ...original);
  }
} finally {
  await server.close();
}
