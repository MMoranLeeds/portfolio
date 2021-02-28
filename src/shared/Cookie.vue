<template>
  <cookie-law theme="mdm">
    <template slot-scope="props">
      <p id="cookieConsent">
        This website uses cookies to ensure you get the best experience whilst browsing.
      </p>
      <button aria-labelledby="cookieConsent" v-on:click="props.accept">Got it!</button>
    </template>
  </cookie-law>
</template>

<script>
import CookieLaw from "vue-cookie-law";
export default {
  components: {
    CookieLaw,
  },
};
</script>
