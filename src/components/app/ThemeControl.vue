<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useDialogMotion } from "@/composables/useDialogMotion";
import { useRoute } from "vue-router";
import { useTheme, type ThemePreference } from "@/composables/useTheme";
import { useMotion, type MotionPreference } from "@/composables/useMotion";
import AnalyticsPreferences from "@/components/privacy/AnalyticsPreferences.vue";
const theme = useTheme();
const motion = useMotion();
const panel = ref<HTMLDialogElement>();
const dialogMotion = useDialogMotion(panel);
const contentPanel = ref<HTMLElement>();
const returnFocus = ref(true);
const trigger = ref<HTMLButtonElement>();
const themeSelect = ref<HTMLSelectElement>();
const expanded = ref(false);
const dialogAvailable = ref(false);
const available = computed(
  () =>
    theme.available.value && motion.available.value && dialogAvailable.value,
);
const themeLabel = computed(
  () =>
    theme.preference.value[0].toUpperCase() + theme.preference.value.slice(1),
);
const motionLabels = {
  system: "System preference",
  reduce: "Reduced motion",
  full: "Full motion",
} as const;
const label = computed(
  () =>
    `Preferences: ${themeLabel.value} theme, ${motionLabels[motion.preference.value]}`,
);
let previousOverflow = "";
let previousGutter = "";
let scrollLocked = false;
let disposed = false;
let backgroundPointer = false;
const restoreScroll = () => {
  if (!scrollLocked) return;
  document.documentElement.style.overflow = previousOverflow;
  document.documentElement.style.scrollbarGutter = previousGutter;
  scrollLocked = false;
};
const openPanel = () => {
  if (!available.value || !panel.value || panel.value.open) return;
  previousOverflow = document.documentElement.style.overflow;
  previousGutter = document.documentElement.style.scrollbarGutter;
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.scrollbarGutter = "stable";
  scrollLocked = true;
  try {
    panel.value.showModal();
  } catch {
    restoreScroll();
    return;
  }
  dialogMotion.enter();
  returnFocus.value = true;
  if (contentPanel.value) contentPanel.value.scrollTop = 0;
  expanded.value = true;
  themeSelect.value?.focus({ preventScroll: true });
};
const closed = () => {
  dialogMotion.reset();
  expanded.value = false;
  backgroundPointer = false;
  restoreScroll();
  if (!disposed && returnFocus.value && trigger.value?.isConnected)
    trigger.value.focus({ preventScroll: true });
};
const closePanel = () => dialogMotion.close();
const outside = (event: MouseEvent) => {
  if (event.target !== panel.value || !contentPanel.value) return false;
  const rect = contentPanel.value.getBoundingClientRect();
  return (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  );
};
const themeChanged = (event: Event) =>
  theme.setPreference(
    (event.target as HTMLSelectElement).value as ThemePreference,
  );
const motionChanged = (event: Event) =>
  motion.setPreference(
    (event.target as HTMLSelectElement).value as MotionPreference,
  );
onMounted(() => {
  dialogAvailable.value =
    typeof HTMLDialogElement !== "undefined" &&
    typeof HTMLDialogElement.prototype.showModal === "function";
});
const route = useRoute();
watch(
  () => route.path,
  () => {
    if (panel.value?.open) {
      returnFocus.value = false;
      dialogMotion.close(true);
    }
  },
);
onBeforeUnmount(() => {
  disposed = true;
  panel.value?.close();
  restoreScroll();
});
</script>
<template>
  <div class="theme-control">
    <button
      ref="trigger"
      class="theme-trigger"
      type="button"
      :disabled="!available"
      :aria-label="label"
      :aria-expanded="expanded"
      aria-controls="preferences-panel"
      aria-haspopup="dialog"
      :title="label"
      @click="openPanel"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        aria-hidden="true"
      >
        <path d="M3 6h4m4 0h10M3 12h10m4 0h4M3 18h4m4 0h10" />
        <circle cx="9" cy="6" r="2" />
        <circle cx="15" cy="12" r="2" />
        <circle cx="9" cy="18" r="2" />
      </svg>
      <span>Preferences</span>
    </button>
    <dialog
      id="preferences-panel"
      ref="panel"
      class="preferences-dialog portfolio-dialog"
      aria-labelledby="preferences-heading"
      aria-describedby="preferences-intro"
      @close="closed"
      @cancel.prevent="closePanel"
      @keydown.esc.stop
      @pointerdown="backgroundPointer = outside($event)"
      @pointerup="backgroundPointer = backgroundPointer && outside($event)"
      @pointercancel="backgroundPointer = false"
      @click="
        if (backgroundPointer && outside($event)) closePanel();
        backgroundPointer = false;
      "
    >
      <button
        type="button"
        class="preferences-close dialog-close"
        aria-label="Close preferences"
        @click="closePanel"
      >
        Close <span aria-hidden="true">×</span>
      </button>
      <div
        ref="contentPanel"
        class="preferences-panel dialog-surface dialog-panel"
      >
        <header class="preferences-header">
          <div>
            <h2 id="preferences-heading">Preferences</h2>
            <p id="preferences-intro">
              Customise display, motion and privacy preferences.
            </p>
          </div>
        </header>
        <div class="preferences-options">
          <div class="preference-row">
            <div>
              <label for="portfolio-theme">Colour theme</label>
              <p id="theme-help">
                Choose a theme or follow your device setting.
              </p>
            </div>
            <select
              id="portfolio-theme"
              ref="themeSelect"
              :value="theme.preference.value"
              aria-describedby="theme-help"
              @change="themeChanged"
            >
              <option value="system">System preference</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div class="preference-row">
            <div>
              <label for="portfolio-motion">Interface motion</label>
              <p id="motion-help">
                Reduce animations and smooth scrolling, or follow your device
                setting.
              </p>
            </div>
            <select
              id="portfolio-motion"
              :value="motion.preference.value"
              aria-describedby="motion-help"
              @change="motionChanged"
            >
              <option value="system">System preference</option>
              <option value="reduce">Reduced motion</option>
              <option value="full">Full motion</option>
            </select>
          </div>
          <AnalyticsPreferences />
        </div>
        <footer class="preferences-footer">
          <button type="button" class="preferences-done" @click="closePanel">
            Done
          </button>
        </footer>
      </div>
    </dialog>
  </div>
</template>
