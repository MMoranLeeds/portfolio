<template>
  <ul data-featured-projects>
    <li
      v-for="(project, i) in headerProjects"
      v-bind:key="i"
      v-bind:style="{ backgroundColor: project.backgroundColor }"
    >
      <router-link
        v-bind:to="{
          name: 'Project Overview',
          params: { 'project': project.reference, 'title': project.title },
        }"
        v-bind:aria-label="
          'Click here to view the ' + project.title + ' project.'
        "
      >
        <div class="content">
          <h3>{{ project.title }}</h3>
        </div>
        
        <template v-if="!isIe11">
          <img
            v-bind:src="'/img/header-projects/' + project.image + '.webp'"
            v-bind:alt="project.altText"
            loading="lazy"
            v-if="!handleLoading"
          />
        </template>

        <template v-else>
          <img
            v-bind:src="'/img/header-projects/' + project.image + '.png'"
            v-bind:alt="project.altText"
            loading="lazy"
            v-if="!handleLoading"
          />
        </template>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { gsap } from "gsap";
export default {
  name: "HeaderProjects",
  data() {
    return {
      headerProjects: [],
      axiosError: false,
      handleLoading: true,
      isIe11: false,
    };
  },
  methods: {
    fetchPersonalIntroduction: function () {
      const baseURI = "/statics/header-projects.json";
      this.$http
        .get(baseURI)
        .then((result) => {
          this.headerProjects = result.data;
        })
        .catch((error) => {
          console.log(error);
          this.axiosError = true;
        })
        .finally(() => {
          this.handleLoading = false;
          this.headerProject1();
          this.headerProject2();
          this.headerProject3();
        });
    },
    headerProject1: function () {
      gsap.from("ul[data-featured-projects] li:nth-of-type(1)", {
        duration: 0.75,
        opacity: 0,
        x: -50,
      });
    },

    headerProject2: function () {
      gsap.from("ul[data-featured-projects] li:nth-of-type(2)", {
        duration: 0.75,
        opacity: 0,
        y: -50,
      });
    },

    headerProject3: function () {
      gsap.from("ul[data-featured-projects] li:nth-of-type(3)", {
        duration: 0.75,
        opacity: 0,
        y: 50,
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
    this.fetchPersonalIntroduction();
    this.checkForIe11();
  },
};
</script>