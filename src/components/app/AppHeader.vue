<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from "vue";
import { profile } from "@/config/profile";
import SectionNavigation from "./SectionNavigation.vue";
import MeetMatt from "./MeetMatt.vue";
import ThemeControl from "./ThemeControl.vue";
import ContactIcons from "./ContactIcons.vue";
defineProps<{ activeId: string }>();
const expanded = ref(false);
const menuButton = ref<HTMLButtonElement>();
const focusSection = async (id: string) => {
  expanded.value = false;
  await nextTick();
  document.getElementById(id)?.focus({ preventScroll: true });
};
const closeOnEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape" && expanded.value) {
    expanded.value = false;
    menuButton.value?.focus();
  }
};
let media: MediaQueryList;
const resetMenu = () => {
  expanded.value = false;
};
onMounted(() => {
  window.addEventListener("keydown", closeOnEscape);
  media = window.matchMedia("(min-width: 960px)");
  media.addEventListener("change", resetMenu);
});
onUnmounted(() => {
  window.removeEventListener("keydown", closeOnEscape);
  media?.removeEventListener("change", resetMenu);
});
</script>
<template>
  <header class="app-header">
    <div class="identity-row">
      <div class="identity">
        <MeetMatt />
        <span class="identity-copy">
          <span class="identity-name">{{ profile.name }}</span>
          <span class="identity-role">{{ profile.role }}</span>
          <span class="identity-focus"
            >Data-driven lead product designer specialising in UX research,
            design systems & web accessibility.</span
          >
        </span>
      </div>
      <button
        ref="menuButton"
        class="menu-button"
        type="button"
        :aria-expanded="expanded"
        aria-controls="mobile-navigation"
        @click="expanded = !expanded"
      >
        {{ expanded ? "Close" : "Menu" }}
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <path v-if="!expanded" d="M3 6h18M3 12h18M3 18h18" />
          <path v-else d="m5 5 14 14M5 19 19 5" />
        </svg>
      </button>
    </div>
    <nav class="desktop-navigation" aria-label="Page sections">
      <SectionNavigation :active-id="activeId" @navigate="focusSection" />
    </nav>
    <nav
      v-show="expanded"
      id="mobile-navigation"
      class="mobile-navigation"
      aria-label="Page sections"
    >
      <SectionNavigation :active-id="activeId" @navigate="focusSection" />
    </nav>
    <div class="header-utilities">
      <div class="sidebar-tools"><ContactIcons /></div>
      <div class="appearance-utility">
        <span class="utility-label">Preferences</span><ThemeControl />
      </div>
    </div>
  </header>
</template>
<style src="./AppHeader.css" />
