<script setup lang="ts">
import { projectSection } from '@/data/portfolio'
import { profile } from '@/config/profile'
import ContentSection from '@/components/content/ContentSection.vue'
import ActionLink from '@/components/ui/ActionLink.vue'
</script>
<template>
  <ContentSection :section="projectSection" eyebrow="Independent side project">
    <ActionLink :href="profile.projectUrl" external>Explore Accessible Trades</ActionLink>
  </ContentSection>
</template>
