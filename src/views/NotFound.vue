<template>
  <main class="not-found" role="main" id="accessible-content-skip-anchor">
    <section class="user-lost">
      <Icon name="robot" />

      <h1>404 - Not Found</h1>

      <p>Beep boop bop.... looks like you're lost.</p>

      <p>Beep boop bop.... click the button below to go home.</p>

      <router-link class="button" to="/">Take me home</router-link>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NotFound extends Vue {}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap");
</style>
