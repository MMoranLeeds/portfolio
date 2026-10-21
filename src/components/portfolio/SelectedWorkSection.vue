<script setup lang="ts">
import ProjectCardMedia from "./ProjectCardMedia.vue";
import { projects } from "@/data/projects/index";
import ArrowIcon from "@/components/ui/ArrowIcon.vue";
</script>
<template>
  <section
    id="case-studies"
    class="content-section"
    aria-labelledby="case-studies-heading"
    tabindex="-1"
  >
    <div class="chapter-number" aria-hidden="true">02<span /></div>
    <h2 id="case-studies-heading">Case studies</h2>
    <p>
      How research informs my design decisions, implementation and learning
      across four projects.
    </p>
    <div class="project-grid">
      <article
        v-for="project in projects"
        :key="project.slug"
        class="project-card"
      >
        <RouterLink
          class="project-card-link"
          :to="`/work/${project.slug}`"
          :aria-label="`Read case study: ${project.title}`"
        >
          <ProjectCardMedia :project="project" />
          <div class="project-card-copy">
            <p class="eyebrow">{{ project.category }}</p>
            <h3>{{ project.title }}</h3>
            <p>{{ project.summary }}</p>
            <ul class="project-tags" aria-label="Project skills">
              <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
            </ul>
            <span class="action-link project-card-action" aria-hidden="true"
              >Read case study <ArrowIcon
            /></span>
          </div>
        </RouterLink>
      </article>
    </div>
  </section>
</template>
