<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import {
  articleProgress,
  caseStudyReading,
  readingWordsPerMinute,
} from "@/utils/caseStudyReading";
import { findProject } from "@/data/projects/index";
import { projectPeerReviews } from "@/data/peerReviews";
import { useMotion } from "@/composables/useMotion";
import { createCompletionBurst } from "@/utils/completionBurst";
import { useTooltip } from "@/composables/useTooltip";
import {
  confettiFrames,
  confettiTiming,
  confettiCleanupMs,
} from "@/utils/confettiMotion";

const props = defineProps<{
  article: HTMLElement | null;
  end: HTMLElement | null;
  slug: string;
}>();
const percent = ref(0);
const tooltip = useTooltip();
// Use the same content counter as the introductory read time, without rounding
// the total first. Recomputes when the project content or route changes.
const reading = computed(() => {
  const project = findProject(props.slug);
  return project
    ? caseStudyReading(project, projectPeerReviews(props.slug))
    : null;
});
const remainingLabel = computed(() => {
  if (percent.value >= 100) return "End of case study";
  if (!reading.value || reading.value.words <= 0) return "";
  const minutes =
    (reading.value.words / readingWordsPerMinute) *
    (1 - Math.max(0, Math.min(100, percent.value)) / 100);
  return minutes <= 1
    ? "Less than 1 min left"
    : `About ${Math.ceil(minutes)} min left`;
});
const progressDescription = computed(() => {
  const progress = `${percent.value}% through the case study`;
  return remainingLabel.value
    ? `${progress}; ${remainingLabel.value}${percent.value < 100 ? " (estimated reading time)" : ""}`
    : progress;
});
const { resolved: motion, available: motionAvailable } = useMotion();
const burst = createCompletionBurst();
const celebrating = ref(false);
const burstId = ref(0);
const confettiElement = ref<HTMLElement | null>(null);
let animations: Animation[] = [];
let celebrationTimer: ReturnType<typeof setTimeout> | undefined;
const stopCelebrating = () => {
  clearTimeout(celebrationTimer);
  animations.forEach((animation) => animation.cancel());
  animations = [];
  celebrating.value = false;
};
// Decorative paper colours, independent of the interface's brand palette.
const confetti = Array.from({ length: 20 }, (_, index) => ({
  "--confetti-colour": [
    "#f3abc2",
    "#a9caf5",
    "#f6df91",
    "#c9b4ef",
    "#a9dfc5",
    "#f7bda0",
  ][index % 6],
  width: `${4 + (index % 3)}px`,
  height: `${6 + ((index * 3) % 5)}px`,
}));
watch(percent, async (value) => {
  if (burst.reach(value, motionAvailable.value && motion.value === "full")) {
    stopCelebrating();
    burstId.value += 1;
    celebrating.value = true;
    const currentBurst = burstId.value;
    await nextTick();
    if (
      !celebrating.value ||
      currentBurst !== burstId.value ||
      motion.value !== "full"
    )
      return;
    const wide = window.matchMedia("(min-width: 1440px)").matches;
    const pieces =
      confettiElement.value?.querySelectorAll<HTMLElement>("i") || [];
    pieces.forEach((piece, index) => {
      if (typeof piece.animate === "function")
        animations.push(
          piece.animate(confettiFrames(index, wide), confettiTiming(index)),
        );
    });
    celebrationTimer = setTimeout(stopCelebrating, confettiCleanupMs);
  }
});
watch(motion, (value) => {
  if (value === "reduce") stopCelebrating();
});
watch(
  () => props.slug,
  () => {
    stopCelebrating();
    burst.reset();
  },
  { flush: "sync" },
);
let frame = 0;
let observer: ResizeObserver | undefined;
let mounted = false;
const update = () => {
  frame = 0;
  if (!props.article || !props.end) return;
  const scroll = window.scrollY;
  percent.value = articleProgress(
    props.article.getBoundingClientRect().top + scroll,
    props.end.getBoundingClientRect().top + scroll,
    scroll,
    window.innerHeight,
  );
};
const schedule = () => {
  if (!frame) frame = window.requestAnimationFrame(update);
};
const observe = () => {
  observer?.disconnect();
  if (props.article) observer?.observe(props.article);
  if (props.end) observer?.observe(props.end);
  schedule();
};
watch(
  () => [props.article, props.end, props.slug],
  async () => {
    percent.value = 0;
    await nextTick();
    if (mounted) observe();
  },
);
onMounted(() => {
  mounted = true;
  if (typeof ResizeObserver !== "undefined")
    observer = new ResizeObserver(schedule);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  window.addEventListener("pageshow", schedule);
  // Image load events catch layout changes even without ResizeObserver.
  document.addEventListener("load", schedule, true);
  document.fonts?.ready.then(() => {
    if (mounted) schedule();
  });
  observe();
});
onUnmounted(() => {
  stopCelebrating();
  mounted = false;
  observer?.disconnect();
  window.cancelAnimationFrame(frame);
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  window.removeEventListener("pageshow", schedule);
  document.removeEventListener("load", schedule, true);
});
</script>
<template>
  <div
    class="case-progress"
    @mouseenter="tooltip.show"
    @mouseleave="tooltip.hide"
  >
    <span
      v-if="remainingLabel"
      class="case-progress-remaining"
      aria-hidden="true"
      >{{ remainingLabel }}</span
    >
    <div
      class="case-progress-accessible visually-hidden"
      role="progressbar"
      aria-label="Case study scroll progress"
      :aria-valuenow="percent"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuetext="progressDescription"
    />
    <div
      v-if="celebrating"
      :key="burstId"
      ref="confettiElement"
      class="case-completion-confetti"
      aria-hidden="true"
    >
      <i v-for="(style, index) in confetti" :key="index" :style="style" />
    </div>
    <div class="case-progress-copy" aria-hidden="true">
      <span class="case-progress-label">{{
        remainingLabel || "Case study progress"
      }}</span
      ><span class="case-progress-linear-value">{{ percent }}%</span>
    </div>
    <div
      class="case-progress-ring"
      role="progressbar"
      tabindex="0"
      aria-label="Case study scroll progress"
      :aria-valuenow="percent"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuetext="progressDescription"
      @focus="tooltip.show"
      @blur="tooltip.hide"
    >
      <svg viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <circle class="case-progress-track" cx="28" cy="28" r="24" />
        <circle
          class="case-progress-fill"
          cx="28"
          cy="28"
          r="24"
          pathLength="100"
          :stroke-dasharray="`${percent} 100`"
          transform="rotate(-90 28 28)"
        />
      </svg>
      <span class="case-progress-ring-content" aria-hidden="true"
        ><span>{{ percent }}%</span></span
      >
    </div>
    <span
      v-if="tooltip.active.value"
      class="contact-tooltip floating-tooltip"
      aria-hidden="true"
      >Time left is estimated from content length and scroll position.</span
    >
    <div class="case-progress-line" aria-hidden="true">
      <span :style="{ width: `${percent}%` }" />
    </div>
  </div>
</template>
<style scoped>
.case-progress {
  position: fixed;
  z-index: 15;
  right: max(1.5rem, env(safe-area-inset-right));
  bottom: max(1.5rem, env(safe-area-inset-bottom));
  color: var(--accent);
  pointer-events: none;
  isolation: isolate;
}
.case-progress-remaining {
  display: none;
  color: var(--muted);
  font-size: 0.8125rem;
  line-height: 1.4;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.case-progress .floating-tooltip {
  width: min(16rem, calc(100vw - 7rem));
}
.case-completion-confetti {
  position: absolute;
  left: 50%;
  bottom: 28px;
  width: 0;
  height: 0;
  z-index: 0;
  pointer-events: none;
}
.case-completion-confetti i {
  position: absolute;
  width: 5px;
  height: 8px;
  background: var(--confetti-colour);
  border-radius: 1px;
  opacity: 0;
  backface-visibility: visible;
}
.case-progress-copy {
  display: none;
  position: relative;
  z-index: 1;
  font-size: 0.6875rem;
  color: var(--muted);
  margin-bottom: 0.5rem;
  text-align: center;
}
.case-progress-ring {
  position: relative;
  z-index: 1;
  width: 56px;
  height: 56px;
  margin: auto;
  border-radius: 50%;
  background: var(--surface);
  pointer-events: auto;
}
@media (min-width: 1440px) {
  .case-progress {
    /* Lift the parent stacking context so confetti clears the back-to-top button. */
    z-index: 17;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.2rem 0.2rem 0.2rem 1rem;
    border-radius: 999px;
    background: var(--panel);
    box-shadow: inset 0 0 0 1px var(--line);
    pointer-events: auto;
  }
  .case-progress-remaining {
    display: block;
  }
  .case-progress-ring {
    flex: 0 0 56px;
    margin: 0;
    background: transparent;
  }
  .case-completion-confetti {
    /* The wider pill must not move the burst away from the ring centre. */
    left: auto;
    right: 28px;
  }

  .case-progress-accessible {
    display: none;
  }
}
.case-progress-ring svg {
  width: 100%;
  height: 100%;
  stroke-width: 3;
}
.case-progress-track {
  stroke: var(--line);
}
.case-progress-fill {
  stroke: var(--accent);
}
.case-progress-ring-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.case-progress-line,
.case-progress-linear-value {
  display: none;
}
@media (max-width: 1439px) {
  .case-progress-remaining {
    display: none;
  }
  .case-completion-confetti {
    bottom: calc(0.4rem + env(safe-area-inset-bottom) + 1.5px);
  }
  .case-progress {
    inset: auto 0 0 var(--sidebar-width);
    padding: 0.35rem 1.5rem calc(0.4rem + env(safe-area-inset-bottom));
    background: var(--surface);
    border-top: 1px solid var(--line);
  }
  .case-progress-copy {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
    line-height: 1.2;
  }
  .case-progress-linear-value {
    display: inline;
    font-variant-numeric: tabular-nums;
  }
  .case-progress-ring {
    display: none;
  }
  .case-progress-line {
    position: relative;
    z-index: 1;
    display: block;
    height: 3px;
    background: var(--line);
  }
  .case-progress-line span {
    display: block;
    height: 100%;
    background: var(--accent);
  }
}
@media (max-width: 959px) {
  .case-progress {
    left: 0;
  }
}
@media print {
  .case-progress {
    display: none;
  }
}
:global(:root[data-motion="reduce"] .case-completion-confetti) {
  display: none;
}
@media (prefers-reduced-motion: reduce) {
  :global(:root:not([data-motion="full"]) .case-completion-confetti) {
    display: none;
  }
}
@media (forced-colors: active) {
  .case-progress-fill {
    stroke: Highlight;
  }
  .case-progress-track {
    stroke: GrayText;
  }
  .case-progress-line span {
    background: Highlight;
    forced-color-adjust: none;
  }
}
</style>
