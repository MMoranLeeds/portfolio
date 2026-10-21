<script setup lang="ts">
import { computed } from "vue";
import type { Project } from "@/types/project";
import { projectCardImage } from "@/data/projects/shared/cardImages";
import { projectMobilePreview } from "@/data/projects/shared/mobilePreview";
import MobileProjectPreview from "./MobileProjectPreview.vue";

const props = defineProps<{ project: Project }>();
const image = computed(() => projectCardImage(props.project));
const mobile = computed(() => projectMobilePreview(props.project));
</script>
<template>
  <div
    class="project-card-media"
    :style="
      project.cover.cardBackground
        ? {
            '--card-media-background': `url('${project.cover.cardBackground}')`,
          }
        : {}
    "
  >
    <img
      class="project-card-screenshot"
      :src="image.src"
      :srcset="image.srcset"
      sizes="(max-width: 639px) calc((100vw - 3rem) * .86), (max-width: 959px) calc((min(768px, 100vw) - 4.5rem) * .43), (max-width: 1147px) calc((100vw - 432px) * .43), 306px"
      alt=""
      :width="image.width"
      :height="image.height"
      loading="lazy"
      decoding="async"
    />
    <MobileProjectPreview
      v-if="mobile"
      class="project-card-mobile"
      :preview="mobile"
      compact
    />
  </div>
</template>
<style scoped>
/* Keep the original 12:5 desktop composition; only the phone is overlaid. */
.project-card-mobile {
  position: absolute;
  width: 17%;
  right: 4%;
  bottom: -24%;
  z-index: 1;
}
</style>
