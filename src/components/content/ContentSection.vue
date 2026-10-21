<script setup lang="ts">
import { computed } from "vue";
import type { PortfolioSection } from "@/types/portfolio";
import ArrowIcon from "@/components/ui/ArrowIcon.vue";
const props = defineProps<{ section: PortfolioSection; eyebrow?: string }>();
type TextPart = { text: string; important: boolean };
const paragraphs = computed(() =>
  props.section.paragraphs.map((text) => ({
    text,
    parts: (props.section.emphasis || []).filter(Boolean).reduce<TextPart[]>(
      (parts, phrase) =>
        parts.flatMap((part) => {
          if (part.important) return [part];
          const position = part.text.indexOf(phrase);
          if (position < 0) return [part];
          return [
            { text: part.text.slice(0, position), important: false },
            { text: phrase, important: true },
            {
              text: part.text.slice(position + phrase.length),
              important: false,
            },
          ].filter((item) => item.text.length > 0);
        }),
      [{ text, important: false }],
    ),
  })),
);
</script>
<template>
  <section
    :id="section.id"
    class="content-section"
    :aria-labelledby="`${section.id}-heading`"
    tabindex="-1"
  >
    <div class="chapter-number" aria-hidden="true">
      {{ section.number }}<span />
    </div>
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2 :id="`${section.id}-heading`">{{ section.title }}</h2>
    <p v-for="paragraph in paragraphs" :key="paragraph.text">
      <template v-for="(part, index) in paragraph.parts" :key="index"
        ><strong v-if="part.important">{{ part.text }}</strong
        ><template v-else>{{ part.text }}</template></template
      >
    </p>
    <p v-for="link in section.links" :key="link.to">
      <RouterLink :to="link.to" class="action-link">
        {{ link.label }} <ArrowIcon />
      </RouterLink>
    </p>
    <slot />
  </section>
</template>
