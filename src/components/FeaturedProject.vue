<template>
  <section data-section-featured>
    <article>
      <router-link
        v-bind:to="{
            name: 'Project Overview',
            params: { project: featured.reference, title: featured.title },
          }"
        v-bind:aria-label="'View the ' + featured.title + 'project'"
        tabindex="-1"
        v-if="!handleLoading"
      >
        <template v-if="!isIe11">
          <img
            v-bind:src="'img/header-projects/' + featured.image + '.webp'"
            v-bind:alt="featured.altText"
            loading="lazy"
          />
        </template>

        <template v-else>
          <img
            v-bind:src="'img/header-projects/' + featured.image + '.jpg'"
            v-bind:alt="featured.altText"
            loading="lazy"
          />
        </template>
      </router-link>

      <div class="content">
        <h3>{{ featured.title }}</h3>
        <p v-html="featured.bodyContent"></p>

        <router-link
          class="button"
          v-bind:aria-label="'View the ' + featured.title + 'project'"
          v-bind:to="{
            name: 'Project Overview',
            params: { project: featured.reference, title: featured.title },
          }"
          v-if="!handleLoading"
          >View</router-link
        >
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: "FeaturedProject",
  data() {
    return {
      featured: [],
      axiosError: false,
      handleLoading: true,
      isIe11: false,
    };
  },
  methods: {
    fetchFeaturedProject: function () {
      const baseURI = "/statics/featured-project.json";
      this.$http
        .get(baseURI)
        .then((result) => {
          this.featured = result.data;
        })
        .catch((error) => {
          console.log(error);
          this.axiosError = true;
        })
        .finally(() => {
          this.handleLoading = false;
        });
    },
    checkForIe11() {
      var ua = window.navigator.userAgent;
      if (ua.indexOf("Trident/7.0") > -1) {
        this.isIe11 = true;
      }
    },
  },
  created() {
    this.fetchFeaturedProject();
    this.checkForIe11();
  },
};
</script>