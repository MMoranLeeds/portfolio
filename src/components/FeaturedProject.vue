<template>
  <section data-section-featured>
    <article>
      <img
        v-bind:src="'img/header-projects/' + featured.image + '.jpg'"
        v-bind:alt="featured.altText"
        loading="lazy"
        v-if="!handleLoading"
      />

      <div class="content">
        <h3>{{featured.title}}</h3>
        <p v-html="featured.bodyContent"></p>

        <router-link class="button" v-bind:aria-label="'View the ' + featured.title + 'project'" v-bind:to="{name: 'ProjectOverview', params:{project:featured.reference}}">View</router-link>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: "PersonalIntroduction",
  data() {
    return {
      featured: [],
      axiosError: false,
      handleLoading: true,
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
  },
  created() {
    this.fetchFeaturedProject();
  },
};
</script>