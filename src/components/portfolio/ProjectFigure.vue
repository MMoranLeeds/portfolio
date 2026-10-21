<script setup lang="ts">
import type { ProjectImage } from "@/types/project";
const props = withDefaults(
  defineProps<{
    image: ProjectImage;
    eager?: boolean;
    interactive?: boolean;
  }>(),
  { eager: false, interactive: false },
);
const emit = defineEmits<{
  open: [image: ProjectImage, trigger: HTMLElement];
}>();
const requestOpen = (event: MouseEvent) => {
  if (props.interactive)
    emit("open", props.image, event.currentTarget as HTMLElement);
};
</script>
<template>
  <figure
    class="project-figure"
    :style="
      image.previewMaxWidth ? { maxWidth: image.previewMaxWidth } : undefined
    "
  >
    <p v-if="image.label" class="figure-label">{{ image.label }}</p>
    <component
      :is="interactive ? 'button' : 'a'"
      class="project-image-trigger"
      :type="interactive ? 'button' : undefined"
      :href="interactive ? undefined : image.fullSrc || image.src"
      :target="interactive ? undefined : '_blank'"
      :rel="interactive ? undefined : 'noopener noreferrer'"
      :aria-haspopup="interactive ? 'dialog' : undefined"
      :aria-label="
        interactive
          ? `Enlarge image: ${image.alt}`
          : `Open full-size image: ${image.alt} (new tab)`
      "
      @click="requestOpen"
    >
      <img
        :class="{ 'project-cover-image': eager }"
        :src="image.src"
        :alt="image.alt"
        :srcset="image.srcset"
        :sizes="image.sizes"
        :width="image.width"
        :height="image.height"
        :style="
          image.previewAspectRatio
            ? {
                aspectRatio: image.previewAspectRatio,
                height: 'auto',
                objectFit: 'cover',
                objectPosition: image.previewPosition || 'top',
              }
            : undefined
        "
        :loading="eager ? 'eager' : 'lazy'"
        decoding="async"
        :fetchpriority="eager ? 'high' : undefined"
      />
    </component>
    <figcaption>
      {{ image.caption }}
      <span class="visually-hidden">{{
        interactive ? "Image opens in a dialog." : "Image opens in a new tab."
      }}</span>
    </figcaption>
  </figure>
</template>
