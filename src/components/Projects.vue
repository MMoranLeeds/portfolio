<template>
  <section data-section-projects >
    <div class="projects">
      <article class="project" v-for="(project, i) in projects" v-bind:key="i">
        <div class="content">
          <h4>{{ project.title }}</h4>
          <router-link
            class="button"
            v-bind:to="{
              name: 'Project Overview',
              params: { 'project': project.reference, 'title': project.title },
            }"
            v-bind:aria-label="'View the ' + project.title + ' project.'"
            >View</router-link
          >
        </div>
        <div class="image">
          <router-link
            v-bind:to="{
              name: 'Project Overview',
              params: { 'project': project.reference, 'title': project.title },
            }"
            v-bind:aria-label="'View the ' + project.title + ' project.'"
            tabindex="-1"
          >
            <template v-if="!isIe11">
              <img
                v-bind:src="
                  '/img/projects/previews/' + project.image.url + '.webp'
                "
                v-bind:alt="project.image.altText"
                loading="lazy"
              />
            </template>

            <template v-else>
              <img
                v-bind:src="
                  '/img/projects/previews/' + project.image.url + '.jpg'
                "
                v-bind:alt="project.image.altText"
                loading="lazy"
              />
            </template>
          </router-link>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: "Projects",

  data() {
    return {
      projects: [],
      axiosError: false,
      handleLoading: true,
      isIe11: false,
    };
  },
  methods: {
    fetchProjects: function () {
      const baseURI = "/statics/projects-preview.json";
      this.$http
        .get(baseURI)
        .then((result) => {
          this.projects = result.data;
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
    this.fetchProjects();
    this.checkForIe11();
  },
};
</script>