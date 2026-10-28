<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import type { ProjectVideo } from "@/types/project";
import { projectVideoTranscripts } from "@/data/projects/generated/videoTranscripts";
const props = defineProps<{ video: ProjectVideo }>();
// Resolve by the MP4 basename so the existing project video data stays untouched.
const transcriptKey = computed(
  () =>
    props.video.src
      .split("/")
      .pop()
      ?.split(/[?#]/)[0]
      ?.replace(/\.mp4$/i, "") || "",
);
const generated = computed(() => projectVideoTranscripts[transcriptKey.value]);
const captionsSrc = computed(
  () => props.video.captionsSrc || generated.value?.captionsSrc,
);
const transcript = computed(() =>
  props.video.transcript?.length
    ? props.video.transcript
    : generated.value?.transcript,
);
const active = ref(false);
const failed = ref(false);
const player = ref<HTMLVideoElement>();
async function play() {
  failed.value = false;
  active.value = true;
  await nextTick();
  player.value?.focus({ preventScroll: true });
  try {
    await player.value?.play();
  } catch {
    /* Native controls remain available if the browser declines playback. */
  }
}
onBeforeUnmount(() => {
  const media = player.value;
  if (!media) return;
  media.pause();
  media.removeAttribute("src");
  media.load();
});
</script>

<template>
  <section
    :id="video.id"
    class="project-video"
    :aria-label="video.title"
    tabindex="-1"
  >
    <h3>{{ video.title }}</h3>
    <p>{{ video.caption }}</p>
    <p v-for="paragraph in video.paragraphs" :key="paragraph">
      {{ paragraph }}
    </p>
    <div
      class="project-video-frame"
      :style="{ aspectRatio: `${video.width} / ${video.height}` }"
    >
      <video
        v-if="active"
        ref="player"
        :src="video.src"
        :poster="video.poster"
        :width="video.width"
        :height="video.height"
        :aria-label="video.title"
        controls
        playsinline
        preload="none"
        tabindex="0"
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
        Your browser does not support embedded video.
      </video>
      <button
        v-else
        class="project-video-play"
        type="button"
        :aria-label="`Play video: ${video.title}`"
        @click="play"
      >
        <img
          :src="video.poster"
          alt=""
          :width="video.width"
          :height="video.height"
          loading="lazy"
          decoding="async"
        />
        <span class="project-video-play-label"
          ><span aria-hidden="true">▶</span>
          {{ video.playLabel || "Watch video" }}</span
        >
      </button>
    </div>
    <p v-if="failed" role="alert" class="project-video-error">
      This video couldn't be played. Please try again later or use the MP4 link
      below.
    </p>
    <a
      class="project-video-file"
      :href="video.src"
      target="_blank"
      rel="noopener noreferrer"
      >Open video as MP4<span class="visually-hidden">
        (opens in a new tab)</span
      ></a
    >
    <details v-if="transcript?.length" class="project-video-transcript">
      <summary>Read the video transcript</summary>
      <p v-for="paragraph in transcript" :key="paragraph">
        {{ paragraph }}
      </p>
      <a
        v-if="generated?.transcriptSrc"
        :href="generated.transcriptSrc"
        download
        >Download transcript as text</a
      >
    </details>
  </section>
</template>

<style scoped>
.project-video {
  margin-block: 2rem;
  scroll-margin-block-start: 2rem;
}
.project-video h3 {
  color: var(--ink);
  font-size: 1.125rem;
}
.project-video-frame {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--soft-surface);
}
.project-video-frame video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.project-video-play {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  color: var(--action-text);
  background: var(--soft-surface);
  cursor: pointer;
}
.project-video-play img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.project-video-play-label {
  position: absolute;
  inset: auto 50% 1rem auto;
  transform: translateX(50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  white-space: nowrap;
  min-height: 48px;
  padding: 0.65rem 1rem;
  border-radius: 6px;
  background: var(--action-bg);
  color: var(--action-text);
  font: 500 1rem var(--font);
}
.project-video-play:hover .project-video-play-label {
  background: var(--action-hover);
}
.project-video-play:focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: -4px;
}
.project-video-file {
  display: inline-block;
  min-height: 44px;
  padding-block: 0.65rem;
  font-size: 0.875rem;
}
.project-video-error {
  border-left: 3px solid var(--focus);
  padding-left: 1rem;
}
.project-video-transcript summary {
  min-height: 44px;
  cursor: pointer;
  padding-block: 0.65rem;
}
</style>
