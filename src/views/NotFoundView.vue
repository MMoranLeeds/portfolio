<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import ArrowIcon from "@/components/ui/ArrowIcon.vue";
import { useMotion } from "@/composables/useMotion";

const motion = useMotion();
// Start static for prerendering, and stop the sequence in background tabs.
const visible = ref(false);
const animating = computed(
  () =>
    visible.value && motion.available.value && motion.resolved.value === "full",
);
const updateVisibility = () => {
  visible.value = !document.hidden;
};
onMounted(() => {
  updateVisibility();
  document.addEventListener("visibilitychange", updateVisibility);
});
onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", updateVisibility);
});
</script>

<template>
  <section class="case-study not-found" aria-labelledby="not-found-heading">
    <p class="eyebrow">404 · Page not found</p>
    <h1 id="not-found-heading">This page seems to have wandered off.</h1>
    <div
      class="lost-robot"
      :class="{ 'is-animating': animating }"
      aria-hidden="true"
    >
      <svg viewBox="0 0 360 280" aria-hidden="true" focusable="false">
        <!-- Brand tokens keep the illustration in sync with both colour themes. -->
        <ellipse class="robot-ground" cx="180" cy="252" rx="104" ry="9" />
        <circle class="robot-halo" cx="181" cy="137" r="105" />
        <g class="robot-stroke">
          <path
            class="robot-feet"
            d="M147 224v19h-22v7h40v-26m34 0v19h-5v7h40v-7h-18v-19"
          />
          <rect
            class="robot-body"
            x="129"
            y="151"
            width="99"
            height="78"
            rx="25"
          />
          <path class="robot-detail" d="M146 164h64M169 206h19" />
          <g class="robot-head">
            <path class="robot-antenna" d="M179 83V63" />
            <circle class="robot-body" cx="179" cy="57" r="7" />
            <rect
              class="robot-body"
              x="113"
              y="86"
              width="133"
              height="76"
              rx="27"
            />
            <rect
              class="robot-face"
              x="127"
              y="101"
              width="105"
              height="45"
              rx="18"
            />
            <g class="robot-eyes">
              <ellipse class="robot-eye" cx="158" cy="123" rx="6" ry="9" />
              <ellipse class="robot-eye" cx="201" cy="123" rx="6" ry="9" />
            </g>
            <path class="robot-detail" d="M104 112v21m151-21v21" />
          </g>
          <path class="robot-arm" d="M133 175q-22 0-27 27" />
          <g class="robot-wave">
            <!-- Keep the palm clear of the ear throughout the full wave arc. -->
            <path class="robot-arm" d="M225 178q29 12 46-3" />
            <rect
              class="robot-body"
              x="258"
              y="147"
              width="26"
              height="32"
              rx="11"
            />
            <path class="robot-detail" d="M266 154v10m9-10v10" />
          </g>
          <!-- A folded map, with its arrow pointing down rather than north. -->
          <g class="robot-map">
            <path
              class="map-paper"
              d="m94 179 30 9 29-9 29 9v54l-29-9-29 9-30-9z"
            />
            <path class="map-fold" d="M124 188v54m29-63v54" />
            <path class="map-route" d="m105 200 29 20 20-16 15 12" />
            <circle class="map-marker" cx="105" cy="200" r="3" />
            <path class="map-pointer" d="M166 197v9m-4-4 4 4 4-4" />
          </g>
          <path class="robot-hand" d="m99 207 12 3m-13 4 11 3" />
        </g>
      </svg>
    </div>
    <p class="not-found-copy">
      The link may be outdated, or the page may have moved. You can head back to
      my portfolio or explore my case studies.
    </p>
    <div class="hero-actions not-found-actions">
      <RouterLink class="action-link action-link--primary" to="/">
        Back to portfolio <ArrowIcon />
      </RouterLink>
      <RouterLink
        class="action-link action-link--secondary"
        to="/#case-studies"
      >
        Explore case studies <ArrowIcon />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  padding-block: 0 2rem;
}
.not-found h1 {
  max-width: 18ch;
  text-wrap: balance;
}
.not-found-copy {
  max-width: 54ch;
}
.lost-robot {
  width: min(100%, 22rem);
  margin-block: 1.5rem;
}
.lost-robot svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}
.robot-ground {
  fill: var(--line);
}
.robot-halo {
  fill: var(--soft-surface);
}
.robot-stroke {
  stroke: var(--accent);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.robot-body,
.robot-hand {
  fill: var(--panel);
}
.robot-feet {
  fill: var(--soft-surface);
}
.robot-face {
  fill: var(--accent);
}
.robot-eye {
  fill: var(--surface);
  stroke: none;
}
.robot-detail,
.robot-antenna {
  fill: none;
}
.robot-arm {
  fill: none;
  stroke-width: 12;
}
.map-paper {
  fill: var(--surface);
}
.map-fold {
  fill: none;
  stroke: var(--line);
  stroke-width: 2;
}
.map-route {
  fill: none;
  stroke: var(--muted);
  stroke-width: 2;
  stroke-dasharray: 3 5;
}
.map-marker,
.map-pointer {
  fill: var(--accent);
  stroke-width: 2;
}
.robot-head {
  transform-origin: 179px 151px;
}
.robot-wave {
  transform-origin: 225px 178px;
}
.is-animating .robot-head {
  animation: robot-look 10s ease-in-out infinite;
}
.is-animating .robot-eyes {
  animation: robot-glance 10s ease-in-out infinite;
}
.is-animating .robot-wave {
  animation: robot-wave 10s ease-in-out infinite;
}
/* Look up at 2.2s, wait 1s, wave for 1.3s, then rest until 10s. */
@keyframes robot-look {
  0%,
  2%,
  22%,
  100% {
    transform: rotate(0deg);
  }
  8%,
  16% {
    transform: translateY(3px) rotate(-8deg);
  }
}
@keyframes robot-glance {
  0%,
  2%,
  22%,
  100% {
    transform: translate(0, 0);
  }
  8%,
  16% {
    transform: translate(-3px, 5px);
  }
}
@keyframes robot-wave {
  0%,
  32%,
  45%,
  100% {
    transform: rotate(0deg);
  }
  34.6%,
  39.8% {
    transform: rotate(-8deg);
  }
  37.2%,
  42.4% {
    transform: rotate(10deg);
  }
}
/* Keep the entire selector inside :global, never target the root on its own. */
:global(:root[data-motion="reduce"] .lost-robot *) {
  animation: none !important;
}
@media (prefers-reduced-motion: reduce) {
  :global(:root:not([data-motion="full"]) .lost-robot *) {
    animation: none !important;
  }
}
@media (max-width: 479px) {
  .lost-robot {
    width: min(100%, 17rem);
  }
  .not-found-actions {
    align-items: stretch;
  }
}
@media (forced-colors: active) {
  .robot-stroke {
    stroke: CanvasText;
  }
  .robot-body,
  .robot-feet,
  .robot-hand,
  .map-paper {
    fill: Canvas;
  }
  .robot-face,
  .map-marker {
    fill: CanvasText;
  }
  .robot-eye {
    fill: Canvas;
  }
  .robot-halo,
  .robot-ground {
    fill: none;
  }
  .map-fold,
  .map-route {
    stroke: CanvasText;
  }
}
</style>
