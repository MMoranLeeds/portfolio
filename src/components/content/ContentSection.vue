<script setup lang="ts">
import { computed } from 'vue'
import type { PortfolioSection } from '@/types/portfolio'
import ArrowIcon from '@/components/ui/ArrowIcon.vue'
const props = defineProps<{ section: PortfolioSection; eyebrow?: string }>()
type TextPart = { text: string; important: boolean }
const paragraphs = computed(() =>
  props.section.paragraphs.map((text) => ({
    text,
    parts: (props.section.emphasis || []).filter(Boolean).reduce<TextPart[]>(
      (parts, phrase) =>
        parts.flatMap((part) => {
          if (part.important) return [part]
          const position = part.text.indexOf(phrase)
          if (position < 0) return [part]
          return [
            { text: part.text.slice(0, position), important: false },
            { text: phrase, important: true },
            {
              text: part.text.slice(position + phrase.length),
              important: false,
            },
          ].filter((item) => item.text.length > 0)
        }),
      [{ text, important: false }],
    ),
  })),
)
</script>
<template>
  <section
    :id="section.id"
    class="content-section"
    :aria-labelledby="`${section.id}-heading`"
    tabindex="-1"
  >
    <div class="chapter-number" aria-hidden="true">{{ section.number }}<span /></div>
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2 :id="`${section.id}-heading`">{{ section.title }}</h2>
    <p v-for="paragraph in paragraphs" :key="paragraph.text">
      <template v-for="(part, index) in paragraph.parts" :key="index"
        ><strong v-if="part.important">{{ part.text }}</strong
        ><template v-else>{{ part.text }}</template></template
      >
    </p>
    <p v-for="link in section.links" :key="link.to">
      <RouterLink :to="link.to" class="action-link"> {{ link.label }} <ArrowIcon /> </RouterLink>
    </p>
    <div v-if="section.skillGroups?.length" class="section-skills">
      <h3>Tools and technologies</h3>
      <p v-if="section.skillsIntro">{{ section.skillsIntro }}</p>
      <dl class="skill-groups">
        <div v-for="group in section.skillGroups" :key="group.title" class="skill-group">
          <dt>{{ group.title }}</dt>
          <dd>{{ group.items.join(', ') }}</dd>
        </div>
      </dl>
    </div>
    <slot />
  </section>
</template>

<style scoped>
.section-skills {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}
.section-skills h3 {
  margin: 0 0 0.75rem;
  color: var(--ink);
  font-size: 1.125rem;
  font-weight: 600;
}
.skill-groups {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem 2rem;
  margin: 1.5rem 0 0;
}
.skill-group {
  min-width: 0;
}
.skill-group dt {
  margin-bottom: 0.375rem;
  color: var(--ink);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
}
.skill-group dd {
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  overflow-wrap: anywhere;
}
@media (max-width: 599px) {
  .skill-groups {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}
</style>
