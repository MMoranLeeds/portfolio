<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useMotion } from '@/composables/useMotion'
import { useRoute, useRouter } from 'vue-router'
import { useFloatingControl } from '@/composables/useFloatingControl'
import { introVideo, introVideoOpenEvent } from '@/config/introVideo'
import { projectVideoTranscripts } from '@/data/projects/generated/videoTranscripts'

const route = useRoute()
const router = useRouter()
const motion = useMotion()
// Match reviewed captions by recording filename, as the case-study players do.
const captionsSrc = computed(() => {
  const key = introVideo.src
    .split('/')
    .pop()
    ?.split('?')[0]
    ?.replace(/\.mp4$/i, '')
  return (key && projectVideoTranscripts[key]?.captionsSrc) || introVideo.captionsSrc
})
const preview = ref<HTMLVideoElement | null>(null)
const launcherRoom = ref(false)
const floatingHeight = ref(720)
const previewPaused = ref(false)
const previewFailed = ref(false)
const pageVisible = ref(true)
const otherMediaActive = ref(false)
const saveData = ref(false)
const launcher = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLDialogElement | null>(null)
const surface = ref<HTMLElement | null>(null)
const player = ref<HTMLVideoElement | null>(null)
const minimiseButton = ref<HTMLButtonElement | null>(null)
const available = ref(false)
const wide = ref(false)
const floatingRoom = ref(false)
const expanded = ref(false)
const modal = ref(false)
const loaded = ref(false)
const failed = ref(false)
const suspended = ref(false)
const floatingTarget = computed<HTMLElement | null>(() =>
  expanded.value && !modal.value ? panel.value : launcher.value,
)
const { offset, fits } = useFloatingControl(
  floatingTarget,
  '.cookie-banner, .case-progress',
  () => wide.value && !modal.value,
)
const showLauncher = computed(
  () => available.value && wide.value && launcherRoom.value && !expanded.value && !suspended.value,
)
// A preview is decorative, muted and separate from the full accessible player.
const previewEligible = computed(
  () =>
    available.value &&
    wide.value &&
    motion.available.value &&
    motion.resolved.value === 'full' &&
    !saveData.value &&
    !previewFailed.value,
)
const previewShouldPlay = computed(
  () =>
    previewEligible.value &&
    showLauncher.value &&
    fits.value &&
    !previewPaused.value &&
    pageVisible.value &&
    !otherMediaActive.value,
)
watch(
  [preview, previewShouldPlay],
  async () => {
    const media = preview.value
    if (!media) return
    if (!previewShouldPlay.value) {
      media.pause()
      return
    }
    media.muted = true
    try {
      await media.play()
    } catch {
      previewFailed.value = true
    }
  },
  { flush: 'post' },
)
function mediaStopped() {
  otherMediaActive.value = [...document.querySelectorAll<HTMLMediaElement>('video, audio')].some(
    (media) => media !== preview.value && !media.paused && !media.ended,
  )
}
let returnFocus: HTMLElement | null = null
let observer: MutationObserver | undefined
let frame = 0
let mounted = false
let previousOverflow: string | undefined
let previousGutter = ''

let transitionAnimations: Animation[] = []
let transitionId = 0
let closing = false
let bubbleSize: { width: number; height: number } | null = null
let openingViewport = ''
const motionAllowed = () => motion.resolved.value === 'full' && !saveData.value && !document.hidden
function stopTransition() {
  transitionId += 1
  for (const animation of transitionAnimations) animation.cancel()
  transitionAnimations = []
}
function transitionToBubble(rect: DOMRect): string {
  const target = surface.value!.getBoundingClientRect()
  return `translate(${rect.left - target.left}px, ${rect.top - target.top}px) scale(${rect.width / target.width}, ${rect.height / target.height})`
}
function animateSurface(fromBubble: DOMRect | null, shrinking = false, done?: () => void) {
  const interruptedTransform =
    shrinking && surface.value ? getComputedStyle(surface.value).transform : 'none'
  stopTransition()
  const element = surface.value
  if (!element || !motionAllowed() || typeof element.animate !== 'function') {
    done?.()
    return
  }
  const token = transitionId
  const small = fromBubble ? transitionToBubble(fromBubble) : 'translateY(8px) scale(0.98)'
  const full = 'translate(0, 0) scale(1, 1)'
  const duration = fromBubble ? (shrinking ? 320 : 640) : 160
  // The dialog stays at its final size for collision detection. Only its
  // inner surface is composited, with no width/height animation or RAF loop.
  try {
    const growth = element.animate(
      shrinking
        ? [
            {
              transform: interruptedTransform === 'none' ? full : interruptedTransform,
              opacity: 1,
            },
            { transform: small, opacity: fromBubble ? 1 : 0 },
          ]
        : [
            { transform: small, opacity: fromBubble ? 1 : 0 },
            { transform: full, opacity: 1 },
          ],
      { duration, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' },
    )
    transitionAnimations.push(growth)
    for (const chrome of element.querySelectorAll<HTMLElement>('.intro-player-header')) {
      transitionAnimations.push(
        chrome.animate(
          shrinking
            ? [{ opacity: 1 }, { opacity: 0 }]
            : [{ opacity: 0 }, { opacity: 0, offset: 0.35 }, { opacity: 1 }],
          { duration, fill: 'both' },
        ),
      )
    }
    void growth.finished
      .then(() => {
        if (token !== transitionId) return
        stopTransition()
        done?.()
      })
      .catch(() => {
        /* Cancellation is expected on resize or rapid interaction. */
      })
  } catch {
    stopTransition()
    done?.()
  }
}
function settleTransition() {
  if (closing) finishCollapse()
  else stopTransition()
}
watch(
  () => motion.resolved.value,
  () => {
    if (motion.resolved.value !== 'full') settleTransition()
  },
)
function viewportChanged() {
  settleTransition()
  bubbleSize = null
  schedule()
}

function restoreScroll() {
  if (previousOverflow === undefined) return
  document.documentElement.style.overflow = previousOverflow
  document.documentElement.style.scrollbarGutter = previousGutter
  previousOverflow = undefined
}
function focusReturn() {
  const target = returnFocus?.isConnected ? returnFocus : trigger.value
  target?.focus({ preventScroll: true })
}
function collapse(restore = true) {
  if (closing && restore) return
  if (restore && expanded.value && panel.value?.open && motionAllowed()) {
    closing = true
    player.value?.pause()
    const bounds = panel.value.getBoundingClientRect()
    const target =
      !modal.value && bubbleSize && openingViewport === `${window.innerWidth}:${window.innerHeight}`
        ? new DOMRect(
            bounds.right - bubbleSize.width,
            bounds.bottom - bubbleSize.height,
            bubbleSize.width,
            bubbleSize.height,
          )
        : null
    animateSurface(target, true, () => finishCollapse(restore))
  } else finishCollapse(restore)
}
function finishCollapse(restore = true) {
  stopTransition()
  closing = false
  const hadFocus = panel.value?.contains(document.activeElement)
  player.value?.pause()
  expanded.value = false
  panel.value?.close()
  restoreScroll()
  modal.value = false
  if (restore && hadFocus) void nextTick(focusReturn)
}
async function contactRequested(event: MouseEvent) {
  // Preserve native open-in-new-tab and modified-click behaviour.
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  collapse(false)
  await router.push({ path: '/', hash: '#contact' })
  await nextTick()
  const section = document.getElementById('contact')
  section?.scrollIntoView({ block: 'start', behavior: 'instant' })
  section?.focus({ preventScroll: true })
}
function setPresentation() {
  const element = panel.value
  if (!expanded.value || !element) return
  const shouldBeModal = !floatingRoom.value
  if (element.open && modal.value === shouldBeModal) return
  if (element.open) element.close()
  restoreScroll()
  modal.value = shouldBeModal
  if (shouldBeModal) {
    previousOverflow = document.documentElement.style.overflow
    previousGutter = document.documentElement.style.scrollbarGutter
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.scrollbarGutter = 'stable'
    element.showModal()
  } else element.show()
}
function measure() {
  frame = 0
  if (!mounted) return
  wide.value = window.innerWidth >= 960
  const article = document.querySelector<HTMLElement>('.reading-column')
  const gutter = article ? window.innerWidth - article.getBoundingClientRect().right : 0
  const obstacles = [
    ...document.querySelectorAll<HTMLElement>('.cookie-banner, .case-progress'),
  ].filter((node) => node.getClientRects().length && getComputedStyle(node).visibility !== 'hidden')
  const topOfControls = Math.min(
    window.innerHeight - 24,
    ...obstacles.map((node) => node.getBoundingClientRect().top),
  )
  const textRight = article
    ? article.getBoundingClientRect().right - parseFloat(getComputedStyle(article).paddingRight)
    : window.innerWidth
  launcherRoom.value = window.innerWidth - textRight >= 152
  // Keep Preferences clear above the player and progress below it.
  floatingHeight.value = Math.max(0, topOfControls - 96)
  floatingRoom.value = wide.value && gutter >= 352 && floatingHeight.value >= 480
  const otherDialog = [...document.querySelectorAll<HTMLDialogElement>('dialog[open]')].some(
    (node) => node !== panel.value,
  )
  suspended.value = otherDialog
  if (otherDialog && expanded.value) collapse(false)
  else setPresentation()
}
function schedule() {
  if (mounted && !frame) frame = requestAnimationFrame(measure)
}
async function open(from?: HTMLElement | null) {
  stopTransition()
  closing = false
  const bubble = launcher.value?.getBoundingClientRect()
  const fromBubble = bubble?.width && bubble.height ? bubble : null
  bubbleSize = fromBubble ? { width: fromBubble.width, height: fromBubble.height } : null
  openingViewport = `${window.innerWidth}:${window.innerHeight}`
  preview.value?.pause()
  returnFocus = from || trigger.value
  measure()
  if (suspended.value) return
  loaded.value = true
  expanded.value = true
  await nextTick()
  if (!mounted) return
  try {
    setPresentation()
  } catch {
    collapse()
    return
  }
  // Layout is committed once, then the browser animates transforms/opacity.
  animateSurface(modal.value ? null : fromBubble)
  minimiseButton.value?.focus({ preventScroll: true })
  try {
    await player.value?.play()
  } catch {
    /* Native play controls remain usable. */
  }
  schedule()
}
function openRequested(event: Event) {
  const source = (event as CustomEvent<{ trigger?: HTMLElement }>).detail?.trigger
  void open(source)
}
function closeEvent() {
  // A resize may have immediately reopened the same element in the other mode.
  if (!panel.value?.open) collapse()
}
function exclusivePlayback(event: Event) {
  const media = event.target
  if (!(media instanceof HTMLMediaElement) || media === preview.value) return
  otherMediaActive.value = true
  if (media === player.value) {
    document.querySelectorAll<HTMLMediaElement>('video, audio').forEach((other) => {
      if (other !== media) other.pause()
    })
  } else player.value?.pause()
}
function visibilityChanged() {
  pageVisible.value = !document.hidden
  if (document.hidden) {
    settleTransition()
    player.value?.pause()
    preview.value?.pause()
  }
}
function escape(event: KeyboardEvent) {
  if (event.key === 'Escape' && expanded.value && !modal.value) {
    event.preventDefault()
    collapse()
  }
}
watch(
  () => route.path,
  () => {
    if (modal.value) collapse(false)
    void nextTick(schedule)
  },
)
onMounted(() => {
  mounted = true
  pageVisible.value = !document.hidden
  saveData.value = Boolean(
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
  )
  available.value = true
  observer = new MutationObserver(schedule)
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['open', 'class', 'hidden'],
  })
  window.addEventListener('resize', viewportChanged)
  window.addEventListener('portfolio-floating-layout-change', schedule)
  window.addEventListener(introVideoOpenEvent, openRequested)
  document.addEventListener('play', exclusivePlayback, true)
  document.addEventListener('pause', mediaStopped, true)
  document.addEventListener('ended', mediaStopped, true)
  document.addEventListener('visibilitychange', visibilityChanged)
  document.addEventListener('keydown', escape)
  window.visualViewport?.addEventListener('resize', viewportChanged)
  measure()
})
onBeforeUnmount(() => {
  mounted = false
  cancelAnimationFrame(frame)
  observer?.disconnect()
  collapse(false)
  preview.value?.pause()
  window.removeEventListener('resize', viewportChanged)
  window.removeEventListener('portfolio-floating-layout-change', schedule)
  window.removeEventListener(introVideoOpenEvent, openRequested)
  document.removeEventListener('play', exclusivePlayback, true)
  document.removeEventListener('pause', mediaStopped, true)
  document.removeEventListener('ended', mediaStopped, true)
  document.removeEventListener('visibilitychange', visibilityChanged)
  document.removeEventListener('keydown', escape)
  window.visualViewport?.removeEventListener('resize', viewportChanged)
})
</script>
<template>
  <div
    v-show="showLauncher && fits"
    ref="launcher"
    class="intro-launcher"
    :style="{ '--intro-offset': `${offset}px` }"
  >
    <button
      ref="trigger"
      class="intro-launcher-play"
      type="button"
      :aria-label="`Play ${introVideo.title}`"
      aria-controls="intro-video-player"
      aria-haspopup="dialog"
      @click="open(trigger)"
    >
      <span class="intro-orb">
        <img :src="introVideo.poster" alt="Portrait of Matthew Moran" width="96" height="96" decoding="async" />
        <video
          v-if="previewEligible"
          ref="preview"
          class="intro-preview-video"
          :src="introVideo.src"
          :poster="introVideo.poster"
          muted
          loop
          playsinline
          preload="none"
          aria-hidden="true"
          tabindex="-1"
          @error="previewFailed = true"
        />
        <span class="intro-orb-play" aria-hidden="true">▶</span>
      </span>
    </button>
    <button
      v-if="previewEligible"
      class="intro-preview-toggle"
      type="button"
      :aria-label="previewPaused ? 'Resume video preview' : 'Pause video preview'"
      :title="previewPaused ? 'Resume preview' : 'Pause preview'"
      @click="previewPaused = !previewPaused"
    >
      <span aria-hidden="true">{{ previewPaused ? '▶' : 'Ⅱ' }}</span>
    </button>
  </div>
  <dialog
    id="intro-video-player"
    ref="panel"
    class="intro-player"
    :class="{ 'intro-player--modal': modal }"
    :style="{
      '--intro-offset': `${offset}px`,
      '--intro-max-height': modal ? 'calc(100dvh - 2rem)' : `${floatingHeight}px`,
    }"
    aria-labelledby="intro-video-heading"
    :aria-modal="modal ? 'true' : undefined"
    @cancel.prevent="collapse()"
    @close="closeEvent"
  >
    <div ref="surface" class="intro-player-surface">
      <header class="intro-player-header">
        <div>
          <h2 id="intro-video-heading">{{ introVideo.title }}</h2>
          <a class="intro-player-contact" href="/#contact" @click="contactRequested">
            Get in touch <span aria-hidden="true">→</span>
          </a>
        </div>
        <div class="intro-player-actions">
          <button
            ref="minimiseButton"
            type="button"
            aria-label="Minimise video introduction"
            @click="collapse()"
          >
            −
          </button>
        </div>
      </header>
      <video
        v-if="loaded"
        ref="player"
        :src="introVideo.src"
        :poster="introVideo.poster"
        :width="introVideo.width"
        :height="introVideo.height"
        :style="{ aspectRatio: introVideo.frameAspectRatio }"
        :aria-label="introVideo.title"
        controls
        playsinline
        preload="none"
        @error="failed = true"
      >
        <track
          v-if="captionsSrc"
          kind="captions"
          :src="captionsSrc"
          srclang="en"
          label="English"
          default
        />
      </video>
      <p v-if="failed" class="intro-player-error" role="alert">
        The video could not be loaded. Please try again later.
      </p>
    </div>
  </dialog>
</template>
<style scoped>
.intro-launcher {
  position: fixed;
  z-index: 19;
  right: max(1.5rem, env(safe-area-inset-right));
  bottom: calc(max(1.5rem, env(safe-area-inset-bottom)) + var(--intro-offset, 0px));
  width: 112px;
  height: 112px;
}
.intro-launcher-play {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 2px solid var(--line);
  box-shadow: 0 0 0 2px var(--action-bg);
  border-radius: 28%;
  background: var(--panel);
  color: var(--ink);
  cursor: pointer;
  font: inherit;
}
.intro-orb {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
}
/* Native superellipse corners, with rounded corners in other browsers. */
@supports (corner-shape: squircle) {
  .intro-launcher-play {
    border-radius: 50%;
    corner-shape: squircle;
  }
  .intro-orb {
    corner-shape: squircle;
  }
}
.intro-orb img,
.intro-preview-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  pointer-events: none;
}
.intro-preview-toggle {
  position: absolute;
  top: -8px;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: var(--panel);
  color: var(--ink);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
}
.intro-preview-toggle {
  left: auto;
  right: -4px;
  font-size: 0.9rem;
}
.intro-launcher:hover .intro-preview-toggle,
.intro-launcher:focus-within .intro-preview-toggle {
  opacity: 1;
  pointer-events: auto;
}
@media (hover: none), (pointer: coarse) {
  .intro-preview-toggle {
    opacity: 1;
    pointer-events: auto;
  }
}
.intro-orb-play {
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--action-bg);
  color: var(--action-text);
  font-size: 0.625rem;
  border: 2px solid var(--panel);
}
.intro-player {
  position: fixed;
  inset: auto max(1.5rem, env(safe-area-inset-right))
    calc(max(1.5rem, env(safe-area-inset-bottom)) + var(--intro-offset, 0px)) auto;
  z-index: 22;
  width: 320px;
  max-width: calc(100vw - 2rem);
  max-height: var(--intro-max-height, calc(100dvh - 2rem));
  margin: 0;
  padding: 0;
  overflow: visible;
  border: 0;
  border-radius: 0;
  color: var(--text);
  background: transparent;
}
.intro-player-surface {
  max-height: var(--intro-max-height, calc(100dvh - 2rem));
  overflow: auto;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--panel);
  box-shadow: 0 20px 70px rgb(0 0 0 / 28%);
  transform-origin: top left;
}
.intro-player--modal {
  inset: 0;
  margin: auto;
  width: min(360px, calc(100vw - 2rem));
  max-height: calc(100dvh - 2rem);
}
.intro-player::backdrop {
  background: rgb(0 0 0 / 65%);
}
.intro-player-header {
  position: sticky;
  top: 0;
  z-index: 2;
  background: var(--panel);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 1rem;
}
.intro-player h2 {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.4;
  color: var(--ink);
}
.intro-player-actions {
  display: flex;
  gap: 0.25rem;
}
.intro-player-actions button {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: var(--soft-surface);
  color: var(--ink);
  font-size: 1.4rem;
  cursor: pointer;
}
.intro-player video {
  display: block;
  width: 100%;
  height: clamp(180px, calc(var(--intro-max-height, 760px) - 144px), 528px);
  max-height: 68dvh;
  background: #000;
  object-fit: contain;
}
.intro-player-contact {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 32px;
  color: var(--accent);
  font-size: 0.8125rem;
  line-height: 1.4;
  text-underline-offset: 0.2em;
}
.intro-player-error {
  margin: 0;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
}
@media (max-height: 760px) {
  .intro-player-header {
    padding: 0.75rem;
  }
  .intro-player video {
    height: clamp(160px, calc(var(--intro-max-height, 680px) - 128px), 480px);
  }
}
button:focus-visible,
a:focus-visible,
summary:focus-visible,
video:focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: 3px;
}
@media (max-width: 959px) {
  .intro-launcher {
    display: none !important;
  }
}
@media print {
  .intro-launcher,
  .intro-player {
    display: none !important;
  }
}
</style>
