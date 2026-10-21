<script setup lang="ts">
import { computed } from "vue";
import { introduction } from "@/data/portfolio";
import { profile, emailHref } from "@/config/profile";
import ActionLink from "@/components/ui/ActionLink.vue";
const paragraphs = computed(() =>
  introduction.paragraphs.map((text) => ({
    text,
    parts: introduction.emphasis.reduce<{ text: string; important: boolean }[]>(
      (parts, phrase) =>
        parts.flatMap((part) => {
          if (part.important) return [part];
          const index = part.text.indexOf(phrase);
          if (index < 0) return [part];
          return [
            { text: part.text.slice(0, index), important: false },
            { text: phrase, important: true },
            { text: part.text.slice(index + phrase.length), important: false },
          ].filter((item) => item.text);
        }),
      [{ text, important: false }],
    ),
  })),
);
</script>
<template>
  <section
    id="introduction"
    class="introduction content-section"
    aria-labelledby="introduction-heading"
    tabindex="-1"
  >
    <div class="chapter-number" aria-hidden="true">01<span /></div>
    <h1 id="introduction-heading">{{ introduction.headline }}</h1>
    <p v-for="paragraph in paragraphs" :key="paragraph.text">
      <template v-for="(part, index) in paragraph.parts" :key="index"
        ><strong v-if="part.important">{{ part.text }}</strong
        ><template v-else>{{ part.text }}</template></template
      >
    </p>
    <div class="hero-actions">
      <ActionLink :href="profile.cvUrl" variant="primary">View my CV</ActionLink
      ><ActionLink :href="emailHref" variant="secondary" external
        >Get in touch</ActionLink
      >
    </div>
  </section>
</template>
