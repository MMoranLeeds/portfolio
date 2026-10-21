<script setup lang="ts">
import type { MobilePreview } from "@/data/projects/shared/mobilePreview";
import type { ProjectImage } from "@/types/project";
withDefaults(
  defineProps<{
    preview: MobilePreview;
    compact?: boolean;
    overlay?: boolean;
    interactive?: boolean;
  }>(),
  { compact: false, overlay: false, interactive: false },
);
const emit = defineEmits<{
  open: [image: ProjectImage, trigger: HTMLElement];
}>();
</script>
<template>
  <figure
    class="mobile-project-preview"
    :class="{ 'mobile-project-preview--compact': compact || overlay }"
    :aria-hidden="compact ? 'true' : undefined"
  >
    <p v-if="!compact && !overlay" class="mobile-preview-label">
      {{ preview.label }}
    </p>
    <component
      :is="
        preview.placeholder || compact ? 'div' : interactive ? 'button' : 'a'
      "
      class="mobile-preview-device"
      :type="
        !preview.placeholder && !compact && interactive ? 'button' : undefined
      "
      :href="
        !preview.placeholder && !compact && !interactive
          ? preview.fullSrc || preview.src
          : undefined
      "
      :target="
        !preview.placeholder && !compact && !interactive ? '_blank' : undefined
      "
      :rel="
        !preview.placeholder && !compact && !interactive
          ? 'noopener noreferrer'
          : undefined
      "
      :aria-label="
        !preview.placeholder && !compact
          ? `Enlarge image: ${preview.alt}`
          : undefined
      "
      :aria-haspopup="
        !preview.placeholder && !compact && interactive ? 'dialog' : undefined
      "
      @click="
        !preview.placeholder &&
        !compact &&
        interactive &&
        emit('open', preview, $event.currentTarget as HTMLElement)
      "
    >
      <img
        class="mobile-preview-image"
        :src="preview.src"
        :srcset="preview.srcset"
        :sizes="preview.sizes"
        :width="preview.width"
        :height="preview.height"
        :alt="compact ? '' : preview.alt"
        loading="lazy"
        decoding="async"
      />
    </component>
    <figcaption v-if="!compact && !overlay">{{ preview.caption }}</figcaption>
  </figure>
</template>
<style scoped>
.mobile-project-preview {
  margin: 0;
  min-width: 0;
}
.mobile-preview-label,
figcaption {
  color: var(--muted);
  font-size: 0.75rem;
  line-height: 1.4;
}
.mobile-preview-label {
  margin: 0 0 0.5rem;
}
figcaption {
  margin-top: 0.6rem;
}
.mobile-preview-device {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 390 / 844;
  padding: 5px;
  border: 2px solid var(--ink);
  border-radius: 20px;
  background: var(--panel);
  box-shadow: 0 4px 14px rgb(0 0 0 / 14%);
  overflow: hidden;
}
.mobile-preview-device::after {
  content: "";
  position: absolute;
  width: 22%;
  height: 4px;
  top: 7px;
  left: 39%;
  background: var(--ink);
  border-radius: 3px;
}
.mobile-preview-device img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 12px;
}
button.mobile-preview-device,
a.mobile-preview-device {
  cursor: zoom-in;
}
.mobile-project-preview--compact .mobile-preview-device {
  padding: 3px;
  border-radius: 13px;
}
.mobile-project-preview--compact img {
  border-radius: 8px;
}
.mobile-project-preview--compact .mobile-preview-device::after {
  top: 5px;
  height: 3px;
}
</style>
