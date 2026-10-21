<script setup lang="ts">
import type { ProjectSection } from "@/types/project";

defineProps<{ sections: ProjectSection[] }>();

function followSection(event: MouseEvent, id: string) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return;
  const link = event.currentTarget as HTMLAnchorElement;
  link.closest("details")?.removeAttribute("open");
  // Preserve native anchor/history behaviour, and move keyboard focus to the heading.
  requestAnimationFrame(() => {
    document.getElementById(`case-${id}`)?.focus({ preventScroll: true });
  });
}
</script>

<template>
  <nav v-if="sections.length" class="case-contents" aria-label="On this page">
    <div class="case-contents-desktop">
      <p class="case-contents-label">On this page</p>
      <ul>
        <li v-for="section in sections" :key="section.id">
          <a
            :href="`#case-${section.id}`"
            @click="followSection($event, section.id)"
            >{{ section.title }}</a
          >
        </li>
      </ul>
    </div>
    <details class="case-contents-mobile">
      <summary>On this page</summary>
      <ul>
        <li v-for="section in sections" :key="section.id">
          <a
            :href="`#case-${section.id}`"
            @click="followSection($event, section.id)"
            >{{ section.title }}</a
          >
        </li>
      </ul>
    </details>
  </nav>
</template>

<style scoped>
.case-contents {
  margin-block: 2rem;
  padding-block: 1rem;
  border-block: 1px solid var(--line);
}
.case-contents-label,
.case-contents summary {
  font-weight: 600;
  color: var(--ink);
  margin: 0;
}
.case-contents ul {
  display: flex;
  flex-wrap: wrap;
  column-gap: 1.25rem;
  row-gap: 0.25rem;
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
}
.case-contents li {
  min-width: 0;
}
.case-contents a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding-block: 0.35rem;
  font-size: 0.875rem;
  text-underline-offset: 0.2em;
  overflow-wrap: anywhere;
}
.case-contents a:focus-visible,
.case-contents summary:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 3px;
  border-radius: 2px;
}
.case-contents-mobile {
  display: none;
}
@media (max-width: 599px) {
  .case-contents-desktop {
    display: none;
  }
  .case-contents-mobile {
    display: block;
  }
  .case-contents summary {
    cursor: pointer;
    min-height: 44px;
    align-content: center;
  }
  .case-contents ul {
    flex-direction: column;
  }
}
</style>
