<script setup lang="ts">
import portrait from "@/assets/images/dist/profile.webp";
import portraitSmall from "@/assets/images/dist/profile-320.webp";
</script>

<template>
  <img
    class="profile-portrait"
    :src="portrait"
    :srcset="`${portraitSmall} 320w, ${portrait} 640w`"
    sizes="(min-width: 960px) 96px, 40px"
    alt=""
    width="96"
    height="96"
    decoding="async"
  />
</template>

<style scoped>
.profile-portrait {
  display: block;
  width: 96px;
  height: 96px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  border: 2px solid var(--line);
  flex-shrink: 0;
  background: var(--portrait-surface);
  box-shadow: 0 0 0 2px var(--action-bg);
}
@media (max-width: 959px) {
  .profile-portrait {
    width: 40px;
    height: 40px;
  }
}
</style>
