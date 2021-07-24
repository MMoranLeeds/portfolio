<template>
  <div class="theme-selector">
    <button
      type="button"
      v-on:click="toggleDarkMode()"
      v-tooltip="prefersDarkMode ? 'Light theme.' : 'Dark theme.'"
    >
      <Icon v-if="prefersDarkMode" name="sun" />

      <Icon v-else name="moon" />

      <span class="off-screen">
        {{ prefersDarkMode ? "Light" : "Dark" }} theme.</span
      >
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class DarkMode extends Vue {
  prefersDarkMode = false;

  toggleDarkMode(): void {
    this.prefersDarkMode = !this.prefersDarkMode;
  }

  created(): void {
    this.prefersDarkMode = JSON.parse(
      localStorage.getItem("prefersDarkMode") as string
    );

    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    if (
      (prefersDarkScheme.matches && !this.prefersDarkMode === false) ||
      (prefersDarkScheme.matches && this.prefersDarkMode == null)
    ) {
      this.prefersDarkMode = true;
    }
  }

  @Watch("prefersDarkMode")
  onPrefersDarkMode(): void {
    localStorage.setItem(
      "prefersDarkMode",
      JSON.stringify(this.prefersDarkMode)
    );

    const el = document.body;

    if (this.prefersDarkMode === true) {
      el.classList.add("dark-mode");
    } else {
      el.classList.remove("dark-mode");
    }
  }
}
</script>