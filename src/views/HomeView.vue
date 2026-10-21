<script setup lang="ts">
import CompaniesSection from "@/components/portfolio/CompaniesSection.vue";
import PeerReviews from "@/components/portfolio/PeerReviews.vue";
import { featuredPeerReviews } from "@/data/peerReviews";
import { approachSections } from "@/data/portfolio";
import ContentSection from "@/components/content/ContentSection.vue";
import IntroductionSection from "@/components/portfolio/IntroductionSection.vue";
import SelectedWorkSection from "@/components/portfolio/SelectedWorkSection.vue";
</script>
<template>
  <IntroductionSection />
  <SelectedWorkSection />
  <ContentSection
    v-for="section in approachSections"
    :key="section.id"
    :section="section"
  />
  <section
    id="testimonials-and-experience"
    class="content-section testimonials-experience"
    aria-labelledby="testimonials-and-experience-heading"
    tabindex="-1"
  >
    <div class="chapter-number" aria-hidden="true">07<span /></div>
    <h2 id="testimonials-and-experience-heading">
      Testimonials &amp; experience
    </h2>
    <PeerReviews :reviews="featuredPeerReviews()" heading-tag="h3" />
    <CompaniesSection />
  </section>
</template>

<style scoped>
.testimonials-experience {
  padding-bottom: 0;
}
.testimonials-experience :deep(.peer-reviews) {
  padding-top: 1.5rem;
  padding-bottom: 0;
  border-bottom: 0;
}
.testimonials-experience :deep(.companies-section) {
  border-bottom: 0;
}
</style>
