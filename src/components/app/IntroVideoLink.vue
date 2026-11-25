<script setup lang="ts">
import { introVideo, introVideoOpenEvent } from "@/config/introVideo";
function open(event: MouseEvent) {
  event.preventDefault();
  window.dispatchEvent(
    new CustomEvent(introVideoOpenEvent, {
      detail: { trigger: event.currentTarget },
    }),
  );
}
</script>
<template>
  <a
    v-if="introVideo.enabled"
    class="intro-video-link"
    :href="introVideo.src"
    @click="open"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m9 5 11 7-11 7z" />
    </svg>
    {{ introVideo.launcherLabel }}
  </a>
</template>
<style scoped>
.intro-video-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
  color: var(--accent);
  text-underline-offset: 0.25em;
  min-height: 44px;
}
.intro-video-link svg {
  width: 1.1rem;
  height: 1.1rem;
}
.intro-video-link:focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: 5px;
  border-radius: 3px;
}
@media print {
  .intro-video-link {
    display: none;
  }
}
</style>
