<script setup lang="ts">
import type { PeerReview } from "@/data/peerReviews";
withDefaults(
  defineProps<{
    reviews: PeerReview[];
    id?: string;
    title?: string;
    number?: string;
    headingTag?: "h2" | "h3";
  }>(),
  {
    id: "testimonials",
    title: "Testimonials",
    number: "",
    headingTag: "h2",
  },
);
</script>
<template>
  <section
    v-if="reviews.length"
    :id="id"
    class="peer-reviews"
    :aria-labelledby="`${id}-heading`"
    tabindex="-1"
  >
    <header class="peer-reviews-heading">
      <div v-if="number" class="chapter-number" aria-hidden="true">
        {{ number }}<span />
      </div>
      <component :is="headingTag" :id="`${id}-heading`">{{ title }}</component>
      <p class="peer-reviews-intro">
        Recent feedback from colleagues and my manager on design, leadership and
        collaboration.
      </p>
    </header>
    <div class="peer-review-grid">
      <figure
        v-for="(review, index) in reviews"
        :key="review.id"
        :class="['peer-review', { 'peer-review--lead': index === 0 }]"
      >
        <div class="review-content">
          <p v-if="review.theme" class="review-theme">{{ review.theme }}</p>
          <blockquote>
            <span class="review-quote-mark" aria-hidden="true">“</span>
            <p>{{ review.quote }}</p>
          </blockquote>
        </div>
        <figcaption>
          <span class="reviewer-name">{{ review.name }}</span>
          <span>{{ review.role }}</span>
          <span v-if="review.context" class="review-context">{{
            review.context
          }}</span>
        </figcaption>
        <div v-if="review.additionalQuote" class="review-continuation">
          <p class="review-theme">Mentoring and development</p>
          <blockquote>
            <p>{{ review.additionalQuote }}</p>
          </blockquote>
          <p v-if="review.additionalContext" class="review-context">
            {{ review.additionalContext }}
          </p>
        </div>
      </figure>
    </div>
  </section>
</template>
