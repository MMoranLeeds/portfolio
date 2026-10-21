<script setup lang="ts">
import { computed, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import AppHeader from "@/components/app/AppHeader.vue";
import AppFooter from "@/components/app/AppFooter.vue";
import BackToTop from "@/components/app/BackToTop.vue";
import CookieConsent from "@/components/privacy/CookieConsent.vue";
import { navigation } from "@/data/portfolio";
import { useActiveSection } from "@/composables/useActiveSection";
const route = useRoute();
const { activeId } = useActiveSection(navigation.map(({ id }) => id));
const currentSection = computed(() =>
  route.name === "home" ? activeId.value : "case-studies",
);
watch(
  () => route.fullPath,
  async () => {
    if (route.meta.sectionScrollSync) return;
    await nextTick();
    const target = route.hash
      ? document.getElementById(route.hash.slice(1))
      : document.getElementById("main-content");
    target?.focus({ preventScroll: true });
  },
);
</script>
<template>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <main
    v-if="route.name === 'cv' || route.name === 'share-studio'"
    id="main-content"
    tabindex="-1"
  >
    <RouterView />
  </main>
  <div
    v-else
    class="app-shell"
    :class="{ 'case-reading-shell': route.name === 'case-study' }"
  >
    <AppHeader :active-id="currentSection" />
    <div class="reading-column">
      <main id="main-content" tabindex="-1"><RouterView /></main>
      <AppFooter />
    </div>
  </div>
  <CookieConsent />
  <BackToTop v-if="route.name === 'home' || route.name === 'case-study'" />
</template>
<style>
.app-shell .reading-column {
  padding-bottom: calc(
    4rem + var(--cookie-consent-space, 0px) + env(safe-area-inset-bottom)
  );
}
</style>
