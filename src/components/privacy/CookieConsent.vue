<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useFloatingControl } from "@/composables/useFloatingControl";
import { useDialogMotion } from "@/composables/useDialogMotion";
import { useRoute } from "vue-router";
import { analyticsConfigured } from "@/config/analytics";
import { useCookieConsent } from "@/composables/useCookieConsent";
import CookieDetails from "./CookieDetails.vue";
import AnalyticsPreferences from "./AnalyticsPreferences.vue";
const route = useRoute();
const { showPrompt, setAnalytics } = useCookieConsent();
const publicPage = computed(() =>
  ["home", "case-study", "cv"].includes(String(route.name)),
);
const visible = computed(() => publicPage.value && showPrompt.value);
const banner = ref<HTMLElement | null>(null);
const { offset: consentOffset } = useFloatingControl(
  banner,
  ".case-progress, .cv-cookie-settings",
);
const cvDialog = ref<HTMLDialogElement | null>(null);
const cvMotion = useDialogMotion(cvDialog);
const cvPanel = ref<HTMLElement | null>(null);
let returnCvFocus = true;
let savedOverflow: string | undefined;
let savedGutter = "";
const cvTrigger = ref<HTMLButtonElement | null>(null);
const cvSettingsOpen = ref(false);
let observer: ResizeObserver | undefined;
let mounted = false;
const measure = () =>
  document.documentElement.style.setProperty(
    "--cookie-consent-space",
    `${visible.value ? (banner.value?.getBoundingClientRect().height || 0) + 24 : 0}px`,
  );
watch(visible, async () => {
  await nextTick();
  if (!mounted) return;
  observer?.disconnect();
  if (banner.value) observer?.observe(banner.value);
  measure();
});
const decide = (allow: boolean) => {
  const restoreFocus = banner.value?.contains(document.activeElement);
  setAnalytics(allow);
  if (restoreFocus)
    nextTick(() =>
      document
        .querySelector<HTMLElement>(".theme-trigger, .cv-cookie-settings")
        ?.focus({ preventScroll: true }),
    );
};
const restoreCvScroll = () => {
  if (savedOverflow === undefined) return;
  document.documentElement.style.overflow = savedOverflow;
  document.documentElement.style.scrollbarGutter = savedGutter;
  savedOverflow = undefined;
};
const cvClosed = () => {
  cvMotion.reset();
  cvSettingsOpen.value = false;
  restoreCvScroll();
  if (mounted && returnCvFocus && cvTrigger.value?.isConnected)
    cvTrigger.value.focus({ preventScroll: true });
};
const openCvSettings = async () => {
  if (!cvDialog.value || cvDialog.value.open) return;
  returnCvFocus = true;
  savedOverflow = document.documentElement.style.overflow;
  savedGutter = document.documentElement.style.scrollbarGutter;
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.scrollbarGutter = "stable";
  try {
    if (typeof cvDialog.value.showModal === "function")
      cvDialog.value.showModal();
    cvSettingsOpen.value = true;
    await nextTick();
    if (!cvDialog.value?.isConnected) {
      restoreCvScroll();
      return;
    }
    if (cvPanel.value) cvPanel.value.scrollTop = 0;
    cvMotion.enter();
    cvPanel.value
      ?.querySelector<HTMLElement>("input, button, select, a")
      ?.focus({ preventScroll: true });
  } catch {
    cvClosed();
  }
};
const closeCvSettings = () => cvMotion.close();
watch(
  () => route.path,
  () => {
    returnCvFocus = false;
    cvMotion.close(true);
    cvClosed();
  },
);
onMounted(() => {
  mounted = true;
  if (typeof ResizeObserver !== "undefined")
    observer = new ResizeObserver(measure);
  window.addEventListener("resize", measure, { passive: true });
  measure();
});
onUnmounted(() => {
  mounted = false;
  cvMotion.close(true);
  restoreCvScroll();
  observer?.disconnect();
  window.removeEventListener("resize", measure);
  document.documentElement.style.removeProperty("--cookie-consent-space");
});
</script>
<template>
  <section
    v-if="visible"
    ref="banner"
    class="cookie-banner"
    :style="{ '--floating-offset': `${consentOffset}px` }"
    aria-labelledby="portfolio-cookie-title"
    aria-describedby="portfolio-cookie-description"
  >
    <h2 id="portfolio-cookie-title">Optional analytics</h2>
    <p id="portfolio-cookie-description">
      May I use Google Analytics to understand which pages people view and the
      countries they visit from? Analytics stays off unless you allow it.
    </p>
    <div class="cookie-actions">
      <button type="button" @click="decide(true)">Allow analytics</button
      ><button type="button" @click="decide(false)">Decline analytics</button>
    </div>
    <CookieDetails />
    <p class="cookie-help">Change your choice later in Preferences.</p>
  </section>
  <template v-if="analyticsConfigured && route.name === 'cv'">
    <button
      ref="cvTrigger"
      class="cv-cookie-settings"
      type="button"
      aria-controls="cv-cookie-preferences"
      :aria-expanded="cvSettingsOpen"
      @click="openCvSettings"
    >
      Cookie preferences
    </button>
    <dialog
      id="cv-cookie-preferences"
      ref="cvDialog"
      class="cv-cookie-dialog portfolio-dialog"
      :open="cvSettingsOpen && typeof cvDialog?.showModal !== 'function'"
      aria-labelledby="cv-cookie-title"
      @cancel.prevent="closeCvSettings"
      @close="cvClosed"
    >
      <button
        type="button"
        class="dialog-close"
        aria-label="Close cookie preferences"
        @click="closeCvSettings"
      >
        Close <span aria-hidden="true">×</span>
      </button>
      <div ref="cvPanel" class="cv-cookie-panel dialog-surface dialog-panel">
        <h2 id="cv-cookie-title">Cookie preferences</h2>
        <AnalyticsPreferences /><button type="button" @click="closeCvSettings">
          Done
        </button>
      </div>
    </dialog>
  </template>
</template>
<style scoped>
.cookie-banner {
  position: fixed;
  z-index: 40;
  right: max(1.5rem, env(safe-area-inset-right));
  bottom: calc(
    max(1.5rem, env(safe-area-inset-bottom)) + var(--floating-offset, 0px)
  );
  width: min(27rem, calc(100vw - var(--sidebar-width) - 3rem));
  max-height: calc(
    100dvh - 3rem - env(safe-area-inset-top) - env(safe-area-inset-bottom) -
      var(--floating-offset, 0px)
  );
  overflow: auto;
  padding: 1rem;
  background: var(--panel);
  color: var(--text);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgb(0 0 0 / 12%);
}
.cookie-banner h2 {
  font-size: 1rem;
  margin: 0 0 0.5rem;
}
.cookie-banner p {
  font-size: 0.8125rem;
  line-height: 1.5;
  margin: 0 0 0.75rem;
}
.cookie-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.cookie-actions button,
.cv-cookie-settings,
.cv-cookie-dialog button:not(.dialog-close) {
  min-height: 44px;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--accent);
  background: var(--panel);
  color: var(--accent);
  border-radius: 5px;
  font: inherit;
  font-size: 0.8125rem;
  cursor: pointer;
}
.cookie-actions button {
  flex: 1;
}
.cookie-actions button:hover,
.cv-cookie-settings:hover {
  background: var(--hover-surface);
}
.cookie-banner .cookie-help {
  margin: 0.25rem 0 0;
  color: var(--muted);
  font-size: 0.75rem;
}
.cv-cookie-settings {
  position: fixed;
  z-index: 40;
  bottom: calc(1rem + env(safe-area-inset-bottom));
  right: 1rem;
}
.cv-cookie-panel {
  padding: 1.5rem;
  width: min(34rem, 100%);
}
.cv-cookie-dialog h2 {
  font-size: 1.25rem;
}
@media (max-width: 959px) {
  .cookie-banner {
    left: max(1rem, env(safe-area-inset-left));
    right: max(1rem, env(safe-area-inset-right));
    width: auto;
    bottom: calc(
      1rem + env(safe-area-inset-bottom) + var(--floating-offset, 0px)
    );
  }
}
@media (min-width: 1440px) {
  .cookie-banner {
    width: min(
      27rem,
      calc(100vw - var(--sidebar-width) - var(--reading-width) - 6rem)
    );
  }
}
@media (min-width: 1500px) {
  .cookie-banner {
    width: min(
      27rem,
      calc(
        100vw - var(--sidebar-width) - var(--reading-width) - 6rem -
          (100vw - 1500px) / 4
      )
    );
  }
}
@media print {
  .cookie-banner,
  .cv-cookie-settings,
  .cv-cookie-dialog {
    display: none;
  }
}
</style>
