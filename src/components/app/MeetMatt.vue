<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { useDialogMotion } from "@/composables/useDialogMotion";
import { useRoute } from "vue-router";
import portrait from "@/assets/images/dist/profile.webp";
import ProfilePortrait from "./ProfilePortrait.vue";
import ActionLink from "@/components/ui/ActionLink.vue";

const route = useRoute();
const panel = ref<HTMLDialogElement>();
const dialogMotion = useDialogMotion(panel);
const contentPanel = ref<HTMLElement>();
const trigger = ref<HTMLButtonElement>();
const closeButton = ref<HTMLButtonElement>();
const available = ref(false);
const expanded = ref(false);

let disposed = false;
let restoreFocus = true;
let backgroundPointer = false;
let previousOverflow = "";
let previousGutter = "";
let scrollLocked = false;

function restoreScroll() {
  if (!scrollLocked) return;

  document.documentElement.style.overflow = previousOverflow;
  document.documentElement.style.scrollbarGutter = previousGutter;
  scrollLocked = false;
}

function open() {
  if (!available.value || !panel.value || panel.value.open) return;

  previousOverflow = document.documentElement.style.overflow;
  previousGutter = document.documentElement.style.scrollbarGutter;

  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.scrollbarGutter = "stable";
  scrollLocked = true;
  restoreFocus = true;

  try {
    panel.value.showModal();
    dialogMotion.enter();

    if (contentPanel.value) contentPanel.value.scrollTop = 0;

    expanded.value = true;
    closeButton.value?.focus({ preventScroll: true });
  } catch {
    restoreScroll();
  }
}

function closed() {
  dialogMotion.reset();
  expanded.value = false;
  backgroundPointer = false;
  restoreScroll();

  if (!disposed && restoreFocus && trigger.value?.isConnected) {
    trigger.value.focus({ preventScroll: true });
  }
}

function close(returnToPhoto = true) {
  restoreFocus = returnToPhoto;
  dialogMotion.close(!returnToPhoto);
}

function outside(event: MouseEvent) {
  if (event.target !== panel.value || !contentPanel.value) return false;

  const bounds = contentPanel.value.getBoundingClientRect();

  return (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  );
}

onMounted(() => {
  available.value =
    typeof HTMLDialogElement !== "undefined" &&
    typeof HTMLDialogElement.prototype.showModal === "function";
});

watch(
  () => route.fullPath,
  () => {
    if (panel.value?.open) close(false);
  },
);

onBeforeUnmount(() => {
  disposed = true;
  panel.value?.close();
  restoreScroll();
});
</script>

<template>
  <div class="meet-matt">
    <button
      ref="trigger"
      type="button"
      class="meet-matt-trigger"
      aria-label="Meet Matt, about me"
      title="Meet Matt"
      aria-haspopup="dialog"
      aria-controls="meet-matt-dialog"
      :aria-expanded="expanded"
      :disabled="!available"
      @click="open"
    >
      <ProfilePortrait />
      <span class="meet-matt-badge" aria-hidden="true">⛶</span>
    </button>

    <dialog
      id="meet-matt-dialog"
      ref="panel"
      class="meet-matt-dialog portfolio-dialog"
      aria-labelledby="meet-matt-heading"
      @close="closed"
      @cancel.prevent="close()"
      @keydown.esc.stop
      @pointerdown="backgroundPointer = outside($event)"
      @pointerup="backgroundPointer = backgroundPointer && outside($event)"
      @pointercancel="backgroundPointer = false"
      @click="
        if (backgroundPointer && outside($event)) close();
        backgroundPointer = false;
      "
    >
      <button
        ref="closeButton"
        class="meet-matt-close dialog-close"
        type="button"
        @click="close()"
      >
        Close <span aria-hidden="true">×</span>
      </button>

      <div
        ref="contentPanel"
        class="meet-matt-panel dialog-surface dialog-panel"
      >
        <div class="meet-matt-content">
          <img
            class="meet-matt-photo"
            :src="portrait"
            alt="Matt smiling with his child on his shoulders."
            width="640"
            height="640"
            decoding="async"
          />

          <div class="meet-matt-copy">
            <h2 id="meet-matt-heading">Hi, I'm Matt.</h2>

            <p>
              I'm a Lead Product Designer based in West Yorkshire. I enjoy
              understanding what makes something difficult to use, then working
              with people to make it clearer.
            </p>

            <p>
              I'm an accessibility advocate. Inclusive design has shaped much of
              my career, from the questions I ask in research to the interfaces
              I help build. At Fruugo, I've owned the company-wide accessibility
              audit across shopper and merchant products.
            </p>

            <p>
              I combine research with hands-on development to turn those
              principles into working products.
            </p>

            <div class="meet-matt-actions">
              <RouterLink
                v-slot="{ href, navigate }"
                to="/#case-studies"
                custom
              >
                <ActionLink
                  :href="href"
                  @click="
                    close(false);
                    navigate($event);
                  "
                >
                  Explore my work
                </ActionLink>
              </RouterLink>

              <RouterLink v-slot="{ href, navigate }" to="/#contact" custom>
                <ActionLink
                  :href="href"
                  @click="
                    close(false);
                    navigate($event);
                  "
                >
                  Get in touch
                </ActionLink>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.meet-matt-trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}

.meet-matt-trigger:disabled {
  cursor: default;
}

.meet-matt-trigger :deep(.profile-portrait) {
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.meet-matt-trigger:focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: 6px;
}

.meet-matt-trigger:focus-visible :deep(.profile-portrait) {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--hover-surface);
}

.meet-matt-trigger:focus-visible .meet-matt-badge {
  animation: scalePop 350ms ease;

}

.meet-matt-badge {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  background: var(--action-bg);
  color: var(--action-text);
  border: 2px solid var(--sidebar);
  border-radius: 50%;
  font: 500 16px/1 var(--font);
  pointer-events: none;
  transform-origin: center;
}

/* Limit hover effects to devices with a precise hovering pointer. */
@media (hover: hover) and (pointer: fine) {
  .meet-matt-trigger:not(:disabled):hover :deep(.profile-portrait) {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px var(--hover-surface);
  }

  .meet-matt-trigger:not(:disabled):hover .meet-matt-badge {
    animation: scalePop 350ms ease;
  }
}

.meet-matt-panel {
  width: min(70rem, 100%);
  padding: clamp(1.25rem, 4vw, 2rem);
}

.meet-matt-content {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 2rem;
}

.meet-matt-photo {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
  aspect-ratio: 1;
  object-fit: cover;
}

.meet-matt-copy h2 {
  color: var(--ink);
}

.meet-matt-copy p {
  font-size: 1rem;
  line-height: 1.65;
}

.meet-matt-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-top: 1rem;
}

@keyframes scalePop {
  0%,
  100% {
    scale: 1;
    
  }

  50% {
    scale: 1.12;
  }
}

/* Honour an explicit reduced-motion choice in the portfolio. */
:global(:root[data-motion="reduce"] .meet-matt-badge) {
  animation: none !important;
}

:global(:root[data-motion="reduce"] .meet-matt-trigger .profile-portrait) {
  transition: none !important;
}

/* Follow the device setting unless full motion was explicitly selected. */
@media (prefers-reduced-motion: reduce) {
  :global(:root:not([data-motion="full"]) .meet-matt-badge) {
    animation: none !important;
  }

  :global(
    :root:not([data-motion="full"]) .meet-matt-trigger .profile-portrait
  ) {
    transition: none !important;
  }
}

@media (max-width: 599px) {
  .meet-matt-content {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .meet-matt-photo {
    max-width: 15rem;
    margin-inline: auto;
  }
}

@media (max-width: 959px) {
  .meet-matt-badge {
    width: 18px;
    height: 18px;
    font-size: 13px;
  }
}

@media print {
  .meet-matt-dialog {
    display: none;
  }
}
</style>
