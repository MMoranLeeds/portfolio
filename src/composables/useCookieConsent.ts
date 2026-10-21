import { computed, readonly, ref } from "vue";
import {
  analyticsConfigured,
  consentStorageKey,
  consentVersion,
  consentLifetimeMs,
} from "@/config/analytics";

export interface CookieChoice {
  version: number;
  necessary: true;
  analytics: boolean;
  updatedAt: string;
}
const choice = ref<CookieChoice | null>(null);
const ready = ref(false);
const listeners = new Set<(choice: CookieChoice | null) => void>();

export function parseCookieChoice(
  raw: string | null,
  now = Date.now(),
): CookieChoice | null {
  try {
    const item = JSON.parse(raw || "null") as Partial<CookieChoice> | null;
    if (
      !item ||
      item.version !== consentVersion ||
      item.necessary !== true ||
      typeof item.analytics !== "boolean" ||
      typeof item.updatedAt !== "string"
    )
      return null;
    const date = Date.parse(item.updatedAt);
    if (!Number.isFinite(date) || date > now || now - date >= consentLifetimeMs)
      return null;
    return item as CookieChoice;
  } catch {
    return null;
  }
}
const notify = () => listeners.forEach((listener) => listener(choice.value));
const read = () => {
  try {
    return parseCookieChoice(window.localStorage.getItem(consentStorageKey));
  } catch {
    return null;
  }
};
export function initialiseCookieConsent() {
  if (ready.value || typeof window === "undefined") return;
  choice.value = read();
  ready.value = true;
  window.addEventListener("storage", (event) => {
    if (event.key === consentStorageKey || event.key === null) {
      choice.value = read();
      notify();
    }
  });
  // Recheck expiry when returning to a long-lived tab.
  document.addEventListener("visibilitychange", () => {
    if (
      !document.hidden &&
      choice.value &&
      !parseCookieChoice(JSON.stringify(choice.value))
    ) {
      choice.value = null;
      notify();
    }
  });
  notify();
}
export function onCookieConsentChange(
  listener: (value: CookieChoice | null) => void,
) {
  listeners.add(listener);
  listener(choice.value);
  return () => listeners.delete(listener);
}
export function useCookieConsent() {
  const setAnalytics = (analytics: boolean) => {
    choice.value = {
      version: consentVersion,
      necessary: true,
      analytics,
      updatedAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(
        consentStorageKey,
        JSON.stringify(choice.value),
      );
    } catch {
      /* Keep the explicit choice for this tab if storage is unavailable. */
    }
    notify();
  };
  return {
    choice: readonly(choice),
    ready: readonly(ready),
    showPrompt: computed(
      () => analyticsConfigured && ready.value && !choice.value,
    ),
    analyticsAllowed: computed(() => choice.value?.analytics === true),
    setAnalytics,
  };
}
