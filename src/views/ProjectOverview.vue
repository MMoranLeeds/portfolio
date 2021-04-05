<template>
  <main class="project-overview" v-if="handleLoading">
    <section>
      <ul>
        <li v-for="(image, i) in projectDetails.images" v-bind:key="i">
          <button
            v-bind:aria-label="`View image ` + [i+1] + ` of the ` + projectDetails.title + ` project.`"
            v-on:click="openGallery(i)"
          >
            <svg>
              <use href="#zoom-icon" />
            </svg>
            <template v-if="!isIe11">
              <img
                v-bind:src="'/img/projects/' + image.url + '.webp'"
                v-bind:alt="image.altText"
              />
            </template>
            <template v-else>
              <img
                v-bind:src="'/img/projects/' + image.url + '.png'"
                v-bind:alt="image.altText"
              />
            </template>
          </button>
        </li>
      </ul>
      <LightBox
        ref="lightbox"
        v-bind:media="projectDetails.images"
        v-bind:show-caption="true"
        v-bind:show-light-box="false"
      />
    </section>
    <div class="project-details">
      <div class="content">
        <h1>{{ projectDetails.title }}</h1>

        <p v-html="projectDetails.introduction"></p>
      </div>
      <div class="actions" v-if="projectDetails.hasExternalLink">
        <a
          class="button"
          v-if="projectDetails.externalLink != null"
          v-bind:href="projectDetails.externalLink"
          target="_blank"
          >View</a
        >
      </div>
    </div>
  </main>
  <main v-else class="project-overview project-loading">
    <section>
      <div v-for="i in 3" v-bind:key="i">
        <svg>
          <use href="#image-icon" />
        </svg>
      </div>
    </section>

    <div class="project-details">
      <div class="content">
        <div v-for="i in 10" v-bind:key="i"></div>
      </div>
    </div>
  </main>
</template>

<script>
import LightBox from "vue-it-bigger";

export default {
  components: {
    LightBox,
  },
  data() {
    return {
      project: this.$route.params.project,
      projectDetails: [],
      axiosError: false,
      handleLoading: false,
      isIe11: false,
    };
  },
  methods: {
    fetchProjects: function () {
      const baseURI = "/statics/projects/" + this.project + ".json";
      this.$http
        .get(baseURI)
        .then((result) => {
          this.projectDetails = result.data;
          this.setDynamicDocumentTitle();
        })
        .catch((error) => {
          console.log(error);
          this.axiosError = true;
          this.$router.push("/NotFound");
        })
        .finally(() => {
          this.handleLoading = true;
        });
    },
    openGallery(i) {
      this.$refs.lightbox.showImage(i);
    },
    removeOverflowClasses() {
      const html = document.getElementsByTagName("html")[0];
      const body = document.getElementsByTagName("body")[0];

      if (
        html.classList.contains("no-scroll") &&
        body.classList.contains("vib-open")
      ) {
        html.classList.remove("no-scroll");
        body.classList.remove("vib-open");
      }
    },
    checkForIe11() {
      var ua = window.navigator.userAgent;
      if (ua.indexOf("Trident/7.0") > -1) {
        this.isIe11 = true;
      }
    },
    setDynamicDocumentTitle() {
      let documentTitle = `${process.env.VUE_APP_TITLE}` + ' - ' + this.projectDetails.title;
      document.title = documentTitle;
    },
  },
  created() {
    this.fetchProjects();
    this.checkForIe11();
  },
  beforeDestroy() {
    this.removeOverflowClasses();
  },
};
</script>