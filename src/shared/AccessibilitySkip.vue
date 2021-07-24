<template>
  <a
    ref="skipLink"
    href="#accessible-content-skip-anchor"
    class="skip-to-content"
  >
    Skip to content
  </a>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class AccessibilitySkip extends Vue {
  $refs!: { skipLink: HTMLElement };

  @Watch("$route")
  on$route() {
    let userTabbing = document.querySelector("body.user-tabbing");

    if (userTabbing) {
      this.$refs.skipLink.focus();
    }
  }
}
</script>
