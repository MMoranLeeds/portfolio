<template>
  <div id="app">
    <AccessibilitySkip />
    <nav>
      <CookieConsent />
      <Navigation />
      <DarkModeToggle />
    </nav>

    <transition name="fade-up-down" mode="out-in">
      <router-view />
    </transition>

    <footer>
      <Navigation />
    </footer>
  </div>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
import AccessibilitySkip from "@/shared/AccessibilitySkip.vue";
import CookieConsent from "@/shared/CookieConsent.vue";
import Navigation from "@/shared/Navigation.vue";
import DarkModeToggle from "@/shared/DarkModeToggle.vue";

const uiModule = namespace("ui");

@Component({
  components: {
    AccessibilitySkip,
    CookieConsent,
    Navigation,
    DarkModeToggle,
  },
})
export default class Home extends Vue {
  @uiModule.Action checkIsIe11!: () => void;

  mounted(): void {
    window.addEventListener("keydown", this.userTabbing);
  }

  userTabbing(e: { keyCode: number; }): void {
    const el = document.body;

    if (e.keyCode === 9) {
      el.classList.add("user-tabbing");
      window.removeEventListener("keydown", this.userTabbing);
      window.addEventListener("mousedown", this.userMouse);
    }
  }

  userMouse(): void {
    const el = document.body;

    el.classList.remove("user-tabbing");
    window.addEventListener("keydown", this.userTabbing);
    window.removeEventListener("mousedown", this.userMouse);
  }
}
</script>
