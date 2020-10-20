<template>
  <section data-section-projects>
    <div class="projects">
      <article class="project" v-for="(project, i) in projects" :key="i">
        <div class="content">
          <h4>{{project.title}}</h4>
          <router-link
            class="button"
            v-bind:to="{name: 'ProjectOverview', params:{project:project.reference}}"
            v-bind:aria-label="'View the ' +project.title+ ' project.'"
          >View</router-link>
        </div>
        <div class="image">
          <router-link
            v-bind:to="{name: 'ProjectOverview', params:{project:project.reference}}"
            v-bind:aria-label="'View the ' +project.title+ ' project.'"
            tabindex="-1"
          >
          <img
            v-bind:src="'/img/projects/previews/'+project.image.url+'.jpg'"
            v-bind:alt="project.image.altText"
            loading="lazy"
          />

          </router-link>
          
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: "PersonalIntroduction",

  data() {
    return {
      projects: [],
      axiosError: false,
      handleLoading: true,
    };
  },
  methods: {
    fetchProjects: function () {
      const baseURI = "/statics/projectsPreview.json";
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
  },
  created() {
    this.fetchProjects();
  },
};
</script>