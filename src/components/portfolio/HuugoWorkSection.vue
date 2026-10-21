<script setup lang="ts">
// Compatibility component for older compositions. The homepage now uses SelectedWorkSection.
import { findProject } from "@/data/projects/index";
const project = findProject("huugo-from-fruugo");
</script>
<template>
  <section
    v-if="project"
    class="huugo-work"
    aria-labelledby="huugo-work-heading"
  >
    <h3 id="huugo-work-heading">{{ project.title }}</h3>
    <p>{{ project.summary }}</p>
    <RouterLink class="action-link" :to="`/work/${project.slug}`"
      >Read case study: {{ project.title }}</RouterLink
    >
  </section>
</template>
