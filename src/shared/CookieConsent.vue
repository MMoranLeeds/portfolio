<template>
  <transition name="appear" mode="out-in" appear>
    <div v-if="!acceptedCookies" class="cookie">
      <p>
        This website uses cookies to provide you with the best experience whilst
        browsing.
      </p>
      <button class="button" v-on:click="toggleAcceptedCookies()">
        Got it!
      </button>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class ProjectOverview extends Vue {
  acceptedCookies = false;

  toggleAcceptedCookies(): void {
    this.acceptedCookies = !this.acceptedCookies;
  }

  created() {
    if (localStorage.getItem("acceptedCookies")) {
      this.acceptedCookies = JSON.parse(
        localStorage.getItem("acceptedCookies") as string
      );
    }
  }

  @Watch("acceptedCookies")
  onAAcceptedCookies(): void {
    localStorage.setItem(
      "acceptedCookies",
      JSON.stringify(this.acceptedCookies)
    );
  }
}
</script>