<script setup lang="ts">
import { ref } from "vue";
import { useBackToTop } from "@/composables/useBackToTop";
import { useFloatingControl } from "@/composables/useFloatingControl";
import { useTooltip } from "@/composables/useTooltip";
const tooltip = useTooltip();
const button = ref<HTMLElement | null>(null);
const { visible, backToTop } = useBackToTop();
const { offset, fits } = useFloatingControl(
  button,
  ".cookie-banner, .case-progress, .cv-cookie-settings",
);
</script>
<template>
  <button
    ref="button"
    type="button"
    class="back-to-top"
    :class="{
      'back-to-top--visible': visible && fits,
    }"
    :style="{ '--floating-offset': `${offset}px` }"
    :disabled="!visible || !fits"
    :tabindex="visible && fits ? 0 : -1"
    :aria-hidden="!visible || !fits ? true : undefined"
    aria-label="Back to top"
    @click="backToTop"
    @mouseenter="tooltip.show"
    @mouseleave="tooltip.hide"
    @focus="tooltip.show"
    @blur="tooltip.hide"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      aria-hidden="true"
    >
      <path d="m6 12 6-6 6 6M12 6v14" />
    </svg>
    <span
      v-if="tooltip.active.value && visible && fits"
      class="contact-tooltip floating-tooltip"
      aria-hidden="true"
      >Back to top</span
    >
  </button>
</template>
<style scoped>
.back-to-top {
  position: fixed;
  z-index: 16;
  right: max(1.5rem, env(safe-area-inset-right));
  bottom: calc(
    max(1.5rem, env(safe-area-inset-bottom)) + var(--floating-offset, 0px)
  );
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--accent);
  background: var(--surface);
  box-shadow: 0 2px 12px rgb(0 0 0 / 10%);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity 160ms ease,
    background-color 160ms ease;
}
.back-to-top--visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
.back-to-top:hover {
  background: var(--hover-surface);
}
.back-to-top:focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: 4px;
}
.back-to-top svg {
  width: 24px;
  height: 24px;
}
@media (min-width: 1440px) {
  .back-to-top {
    width: 56px;
    height: 56px;
  }
}
@media (max-width: 959px) {
  .back-to-top {
    right: max(1rem, env(safe-area-inset-right));
    bottom: calc(
      1rem + env(safe-area-inset-bottom) + var(--floating-offset, 0px)
    );
  }
}
@media print {
  .back-to-top {
    display: none;
  }
}
</style>
