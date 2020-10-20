<template>
  <div class="theme-selector" v-tooltip="darkModePreference ? 'Light theme.' : 'Dark theme.'">
    <button
      type="button"
      v-on:click="toggleDarkMode()"
    >
      <svg v-if="darkModePreference">
        <use href="#light-mode-icon" />
      </svg>

      <svg v-else>
        <use href="#dark-mode-icon" />
      </svg>
      <span class="off-screen"> {{ darkModePreference ? 'Light' : 'Dark' }} theme.</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkModePreference: false
    };
  },

  methods: {
    toggleDarkMode() {
      this.darkModePreference = !this.darkModePreference;
    },
  },

  created() {
    this.darkModePreference = JSON.parse(
      localStorage.getItem("darkModePreference")
    );

    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    if (
      (prefersDarkScheme.matches && !this.darkModePreference === false) ||
      (prefersDarkScheme.matches && this.darkModePreference == null)
    ) {
      this.darkModePreference = true;
      document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#1e1e1e');
    }
  },

  watch: {
    darkModePreference: function () {
      localStorage.setItem(
        "darkModePreference",
        JSON.stringify(this.darkModePreference)
      );

      const el = document.body;

      if (this.darkModePreference === true) {
        el.classList.add("dark-mode");
        document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#1e1e1e');
      } else {
        el.classList.remove("dark-mode");
        document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#165782');
      }
    },
  },
};
</script>