import assert from "node:assert/strict";
import { createServer } from "vite";
import { readFile } from "node:fs/promises";

const server = await createServer({ server: { middlewareMode: true } });
const flush = async () => {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
};
try {
  const { createAnalyticsController, safeReferrer } =
    await server.ssrLoadModule("/src/services/analytics.ts");
  const { parseCookieChoice, useCookieConsent, initialiseCookieConsent } =
    await server.ssrLoadModule("/src/composables/useCookieConsent.ts");
  const { consentStorageKey, consentLifetimeMs } = await server.ssrLoadModule(
    "/src/config/analytics.ts",
  );
  const now = Date.now();
  const valid = {
    version: 1,
    necessary: true,
    analytics: false,
    updatedAt: new Date(now).toISOString(),
  };
  assert.equal(parseCookieChoice(null), null);
  assert.equal(parseCookieChoice("bad json"), null);
  assert.equal(
    parseCookieChoice(JSON.stringify({ ...valid, analytics: "true" })),
    null,
  );
  assert.equal(
    parseCookieChoice(JSON.stringify({ ...valid, version: 0 })),
    null,
  );
  assert.equal(
    parseCookieChoice(JSON.stringify(valid), now + consentLifetimeMs),
    null,
  );
  assert.equal(parseCookieChoice(JSON.stringify(valid), now - 1), null);
  assert.deepEqual(parseCookieChoice(JSON.stringify(valid), now), valid);
  assert.equal(
    safeReferrer("https://example.com/path?email=private@example.com#secret"),
    "https://example.com/path",
  );
  assert.equal(safeReferrer("javascript:alert(1)"), "");

  function environment() {
    const scripts = [];
    const deletions = [];
    const win = { location: { hostname: "portfolio.example.com" } };
    const doc = {
      get cookie() {
        return "_ga=old; _ga_TEST=old; portfolio-theme=dark";
      },
      set cookie(value) {
        deletions.push(value);
      },
      head: {
        append(script) {
          scripts.push(script);
        },
      },
      createElement() {
        const listeners = new Map();
        return {
          removed: false,
          addEventListener(name, callback) {
            listeners.set(name, callback);
          },
          remove() {
            this.removed = true;
          },
          fire(name) {
            listeners.get(name)?.();
          },
        };
      },
    };
    return {
      window: win,
      document: doc,
      scripts,
      deletions,
      events: () => (win.dataLayer || []).map((item) => Array.from(item)),
    };
  }
  const page = (path) => ({
    path,
    title: "Portfolio",
    location: `https://portfolio.example.com${path}`,
    referrer: "",
  });
  const env = environment();
  const controller = createAnalyticsController("G-TEST", env);
  controller.pageView(page("/"));
  controller.setConsent(false);
  await flush();
  assert.equal(env.scripts.length, 0);
  assert.equal(env.window.gtag, undefined);
  assert.equal(env.window["ga-disable-G-TEST"], true);
  controller.setConsent(true);
  assert.equal(env.scripts.length, 1);
  assert.equal(env.events().filter((item) => item[0] === "event").length, 0);
  // A route change during loading must send only the latest page.
  controller.pageView(page("/work/huugo-from-fruugo"));
  env.scripts[0].fire("load");
  await flush();
  const events = () => env.events().filter((item) => item[0] === "event");
  assert.equal(events().length, 1);
  assert.equal(events()[0][2].page_path, "/work/huugo-from-fruugo");
  const config = env.events().find((item) => item[0] === "config")[2];
  assert.equal(config.send_page_view, false);
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.allow_ad_personalization_signals, false);
  controller.pageView(page("/work/huugo-from-fruugo"));
  await flush();
  assert.equal(events().length, 1);
  controller.pageView(page("/cv"));
  await flush();
  assert.equal(events().length, 2);
  controller.setConsent(false);
  controller.pageView(page("/"));
  await flush();
  assert.equal(events().length, 2);
  assert.equal(env.window["ga-disable-G-TEST"], true);
  assert(env.deletions.some((value) => value.startsWith("_ga=;")));
  assert(!env.deletions.some((value) => value.startsWith("portfolio-theme=")));
  controller.setConsent(true);
  await flush();
  assert.equal(events().length, 3);
  assert.equal(env.scripts.length, 1);
  controller.pageView(null);
  controller.setConsent(false);
  await flush();
  assert.equal(events().length, 3);
  controller.destroy();

  const race = environment();
  const delayed = createAnalyticsController("G-TEST", race);
  delayed.pageView(page("/"));
  delayed.setConsent(true);
  delayed.setConsent(false);
  race.scripts[0].fire("load");
  await flush();
  assert(race.scripts[0].removed);
  assert.equal(race.events().filter((item) => item[0] === "event").length, 0);
  assert.equal(race.window["ga-disable-G-TEST"], true);
  delayed.setConsent(true);
  race.scripts[1].fire("load");
  await flush();
  assert.equal(race.events().filter((item) => item[0] === "event").length, 1);
  delayed.destroy();

  const failed = environment();
  const errorController = createAnalyticsController("G-TEST", failed);
  errorController.pageView(page("/"));
  errorController.setConsent(true);
  failed.scripts[0].fire("error");
  await flush();
  assert.equal(failed.events().filter((item) => item[0] === "event").length, 0);
  errorController.destroy();

  const oldWindow = globalThis.window;
  const oldDocument = globalThis.document;
  const handlers = new Map();
  let stored = JSON.stringify(valid);
  globalThis.window = {
    localStorage: {
      getItem() {
        return stored;
      },
      setItem() {
        throw new Error("blocked");
      },
    },
    addEventListener(name, callback) {
      handlers.set(name, callback);
    },
  };
  globalThis.document = { hidden: false, addEventListener() {} };
  try {
    initialiseCookieConsent();
    const consent = useCookieConsent();
    assert.equal(consent.analyticsAllowed.value, false);
    consent.setAnalytics(true);
    assert.equal(consent.analyticsAllowed.value, true);
    stored = JSON.stringify({ ...valid, analytics: false });
    handlers.get("storage")({ key: consentStorageKey });
    assert.equal(consent.analyticsAllowed.value, false);
    stored = null;
    handlers.get("storage")({ key: null });
    assert.equal(consent.choice.value, null);
  } finally {
    globalThis.window = oldWindow;
    globalThis.document = oldDocument;
  }
  for (const path of [
    "dist/index.html",
    "dist/cv/index.html",
    "dist/work/huugo-from-fruugo/index.html",
  ]) {
    const html = await readFile(path, "utf8");
    assert(!/<script[^>]+src="https:\/\/(?:www\.)?googletagmanager/.test(html));
    assert(
      !html.includes('rel="preconnect" href="https://www.googletagmanager.com'),
    );
    assert(!html.includes('class="cookie-banner"'));
  }
  console.log(
    "No pre-consent tag, expiry, blocked storage, cross-tab withdrawal, route views, duplicates, script failures and loading-race withdrawal passed.",
  );
} finally {
  await server.close();
}
