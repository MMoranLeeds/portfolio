<template>
  <div>
    <router-link to="/" aria-label="Home page">
      <svg>
        <use href="#logo" />
      </svg>
    </router-link>

    <ul class="external-links">
      <li v-for="(link, i) in externalLinks" v-bind:key="i">
        <a
          v-bind:href="link.url"
          target="_blank"
          v-bind:arial-label="link.ariaLabel"
          v-tooltip="link.ariaLabel"
          rel="noopener"
        >
          <svg v-bind:aria-label="link.ariaLabel">
            <use v-bind:href="'#' + link.icon" />
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      externalLinks: [],
      axiosError: false,
      handleLoading: true,
      darkModePreference: false,
    };
  },
  methods: {
    fetchExternalLinks: function () {
      const baseURI = "/statics/external-links.json";
      this.$http
        .get(baseURI)
        .then((result) => {
          this.externalLinks = result.data;
        })
        .catch((error) => {
          console.log(error);
          this.axiosError = true;
        })
        .finally(() => {
          this.handleLoading = false;
        });
    },
  },
  created() {
    this.fetchExternalLinks();
  },
};
</script>