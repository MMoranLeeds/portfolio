import type { Router } from "vue-router";
import { gaMeasurementId } from "@/config/analytics";
import { site } from "@/config/site";
import { navigation } from "@/data/portfolio";
import { findProject } from "@/data/projects/index";
import { onCookieConsentChange } from "@/composables/useCookieConsent";

type Gtag = (...args: unknown[]) => void;
interface AnalyticsWindow extends Window {
  dataLayer?: unknown[];
  gtag?: Gtag;
  [key: `ga-disable-${string}`]: boolean | undefined;
}
export interface AnalyticsPage {
  path: string;
  title: string;
  location: string;
  referrer: string;
}

export function safeReferrer(raw: string): string {
  try {
    const url = new URL(raw);
    return ["http:", "https:"].includes(url.protocol)
      ? url.origin + url.pathname
      : "";
  } catch {
    return "";
  }
}
/** Consent-gated native Google tag; no third-party code is loaded before opt-in. */
export function createAnalyticsController(
  id: string,
  browser: { window: AnalyticsWindow; document: Document },
) {
  const win = browser.window;
  const doc = browser.document;
  const disabledKey = `ga-disable-${id}` as const;
  let allowed = false;
  let loaded = false;
  let loading: Promise<boolean> | null = null;
  let cancelLoad: (() => void) | undefined;
  let configured = false;
  let current: AnalyticsPage | null = null;
  let lastPath = "";
  let revision = 0;
  win[disabledKey] = true;
  const tag = (...args: unknown[]) => win.gtag?.(...args);
  const clearCookies = () => {
    const names = doc.cookie
      .split(";")
      .map((item) => item.trim().split("=")[0] || "")
      .filter((name) => name === "_ga" || name.startsWith("_ga_"));
    const parts = win.location.hostname.split(".");
    for (const name of names) {
      const deletion = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
      doc.cookie = deletion;
      for (let index = 0; index < parts.length - 1; index++)
        doc.cookie = `${deletion}; Domain=${parts.slice(index).join(".")}`;
    }
  };
  const load = (): Promise<boolean> => {
    if (loaded) return Promise.resolve(true);
    if (loading) return loading;
    win.dataLayer ||= [];
    win.gtag ||= function () {
      // Google's queue expects the arguments object used by its standard snippet.
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer?.push(arguments);
    };
    // Defaults are queued locally; the tag is injected only after explicit consent.
    tag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    tag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    tag("js", new Date());
    loading = new Promise((resolve) => {
      const script = doc.createElement("script");
      script.id = "portfolio-google-analytics";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
      let settled = false;
      const finish = (success: boolean) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        loaded = success;
        loading = null;
        cancelLoad = undefined;
        if (!success) script.remove();
        resolve(success);
      };
      const timeout = setTimeout(() => finish(false), 10000);
      cancelLoad = () => finish(false);
      script.addEventListener("load", () => finish(true), { once: true });
      script.addEventListener("error", () => finish(false), { once: true });
      doc.head.append(script);
    });
    return loading;
  };
  const sendCurrent = async () => {
    if (!allowed || !current) return;
    const requested = revision;
    if (!(await load()) || !allowed || requested !== revision || !current)
      return;
    if (!configured) {
      tag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      tag("config", id, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        cookie_domain: "none",
        cookie_expires: 15552000,
        cookie_update: true,
        page_location: current.location,
        page_referrer: current.referrer,
      });
      configured = true;
    }
    if (lastPath === current.path) return;
    lastPath = current.path;
    tag("event", "page_view", {
      send_to: id,
      page_title: current.title,
      page_path: current.path,
      page_location: current.location,
      page_referrer: current.referrer,
    });
  };
  return {
    setConsent(value: boolean) {
      if (allowed === value && value) return;
      allowed = value;
      revision++;
      lastPath = "";
      win[disabledKey] = !value;
      if (!value) {
        configured = false;
        cancelLoad?.();
        if (!loaded && win.dataLayer) win.dataLayer.length = 0;
        if (loaded)
          tag("consent", "update", {
            analytics_storage: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
          });
        clearCookies();
      } else {
        void sendCurrent();
      }
    },
    pageView(page: AnalyticsPage | null) {
      current = page;
      void sendCurrent();
    },
    destroy() {
      allowed = false;
      revision++;
      win[disabledKey] = true;
      cancelLoad?.();
    },
  };
}

export function initialiseAnalytics(router: Router) {
  // Preview URLs and localhost do not pollute production analytics.
  if (
    !gaMeasurementId ||
    !import.meta.env.PROD ||
    !site.indexable ||
    window.location.hostname !== new URL(site.origin).hostname
  )
    return;
  const controller = createAnalyticsController(gaMeasurementId, {
    window: window as unknown as AnalyticsWindow,
    document,
  });
  let consent = false;
  const sync = () => {
    const route = router.currentRoute.value;
    const publicPage =
      route.name === "home" ||
      route.name === "cv" ||
      (route.name === "case-study" &&
        Boolean(findProject(String(route.params.slug))));
    const hash = navigation.some((item) => `#${item.id}` === route.hash)
      ? route.hash
      : "";
    const path = route.path + hash;
    controller.pageView(
      publicPage
        ? {
            path,
            title: document.title,
            location: site.origin + path,
            referrer: safeReferrer(document.referrer),
          }
        : null,
    );
    controller.setConsent(consent && publicPage);
  };
  onCookieConsentChange((value) => {
    consent = value?.analytics === true;
    sync();
  });
  router.afterEach(() => {
    queueMicrotask(sync);
  });
}
