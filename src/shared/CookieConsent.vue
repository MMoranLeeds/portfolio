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

<script>
export default {
  data() {
    return {
      acceptedCookies: false,
    };
  },
  methods: {
    toggleAcceptedCookies() {
      this.acceptedCookies = !this.acceptedCookies;
    },
  },
  created() {
    if (localStorage.getItem("acceptedCookies")) {
      this.acceptedCookies = JSON.parse(
        localStorage.getItem("acceptedCookies")
      );
    }
  },
  watch: {
    acceptedCookies: function () {
      localStorage.setItem(
        "acceptedCookies",
        JSON.stringify(this.acceptedCookies)
      );
    },
  },
};
</script>