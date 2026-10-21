<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, shallowRef } from "vue";
import { useDialogMotion } from "@/composables/useDialogMotion";
import type { ProjectImage } from "@/types/project";

const dialog = ref<HTMLDialogElement>();
const dialogMotion = useDialogMotion(dialog);
const closeButton = ref<HTMLButtonElement>();
const content = ref<HTMLDivElement>();
const image = shallowRef<ProjectImage | null>(null);
const loading = ref(false);
const failed = ref(false);
let trigger: HTMLElement | undefined;
let previousOverflow: string | undefined;
let previousGutter: string | undefined;
let backgroundPointer = false;
let disposed = false;

const restoreScroll = () => {
  if (previousOverflow === undefined) return;
  document.documentElement.style.overflow = previousOverflow;
  document.documentElement.style.scrollbarGutter = previousGutter ?? "";
  previousOverflow = undefined;
  previousGutter = undefined;
};
const closed = () => {
  dialogMotion.reset();
  restoreScroll();
  image.value = null;
  backgroundPointer = false;
  const previousTrigger = trigger;
  trigger = undefined;
  if (!disposed && previousTrigger?.isConnected)
    previousTrigger.focus({ preventScroll: true });
};
const close = (restoreFocus = true) => {
  if (!restoreFocus) trigger = undefined;
  dialogMotion.close(!restoreFocus);
};
const open = async (selected: ProjectImage, source: HTMLElement) => {
  if (disposed || !dialog.value || dialog.value.open) return;
  trigger = source;
  image.value = selected;
  loading.value = true;
  failed.value = false;
  await nextTick();
  if (disposed || !dialog.value?.isConnected) return;
  previousOverflow = document.documentElement.style.overflow;
  previousGutter = document.documentElement.style.scrollbarGutter;
  document.documentElement.style.scrollbarGutter = "stable";
  document.documentElement.style.overflow = "hidden";
  dialog.value.showModal();
  dialogMotion.enter();
  dialog.value.scrollTop = 0;
  closeButton.value?.focus({ preventScroll: true });
};
const isBackground = (event: Event) =>
  event.target === dialog.value || event.target === content.value;
const pointerDown = (event: PointerEvent) => {
  backgroundPointer = isBackground(event);
};
const pointerUp = (event: PointerEvent) => {
  backgroundPointer = backgroundPointer && isBackground(event);
};
const clickBackground = (event: MouseEvent) => {
  // Starting on the image and releasing outside it must not dismiss the viewer.
  if (backgroundPointer && isBackground(event)) close();
  backgroundPointer = false;
};
onBeforeUnmount(() => {
  disposed = true;
  dialog.value?.close();
  restoreScroll();
});
defineExpose({ open, close });
</script>

<template>
  <dialog
    ref="dialog"
    class="image-lightbox portfolio-dialog"
    :class="{
      'image-lightbox--document':
        image?.previewAspectRatio && image.height > image.width * 1.5,
    }"
    aria-labelledby="image-lightbox-title"
    :aria-describedby="image ? 'image-lightbox-caption' : undefined"
    @close="closed"
    @cancel.prevent="close()"
    @pointerdown="pointerDown"
    @pointerup="pointerUp"
    @pointercancel="backgroundPointer = false"
    @click="clickBackground"
    @keydown.esc.stop
  >
    <h2 id="image-lightbox-title" class="visually-hidden">Image viewer</h2>
    <template v-if="image">
      <button
        ref="closeButton"
        class="image-lightbox-close dialog-close"
        type="button"
        aria-label="Close image"
        @click="close()"
      >
        <span>Close</span><span aria-hidden="true">×</span>
      </button>
      <div ref="content" class="image-lightbox-content dialog-surface">
        <p
          v-if="loading && !failed"
          class="image-lightbox-status"
          role="status"
        >
          Loading image…
        </p>
        <img
          v-if="!failed"
          class="image-lightbox-image"
          :src="image.fullSrc || image.src"
          :alt="image.alt"
          :width="image.width"
          :height="image.height"
          decoding="async"
          draggable="false"
          @load="loading = false"
          @error="
            failed = true;
            loading = false;
          "
        />
        <p v-else class="image-lightbox-error" role="alert">
          This image couldn’t be loaded. Close the viewer and try again.
        </p>
        <p id="image-lightbox-caption" class="visually-hidden">
          {{ image.caption }}
        </p>
      </div>
    </template>
  </dialog>
</template>

<style scoped>
.image-lightbox-content {
  position: relative;
  max-width: 100%;
  min-width: min(16rem, 100%);
}
.image-lightbox-image {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: calc(100vh - 8rem);
  max-height: calc(100dvh - 8rem);
  margin: auto;
  border-radius: 8px;
  background: var(--surface);
}
.portfolio-dialog.image-lightbox--document[open] {
  align-items: start;
}
.image-lightbox--document .image-lightbox-image {
  max-height: none;
}
.image-lightbox-status,
.image-lightbox-error {
  padding: 1rem;
  border-radius: 6px;
  background: var(--surface);
  color: var(--ink);
}
.image-lightbox-status {
  position: absolute;
  inset: 1rem auto auto 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}
</style>
