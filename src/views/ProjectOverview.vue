<template>
  <main class="project-overview" v-if="handleLoading">
    <section>
      <ul>
        <li v-for="(image, i) in project.images" v-bind:key="i">
          <button
            aria-label="Click to view this image"
            v-on:click="openGallery(i)"
          >
            <svg>
              <use href="#zoom-icon" />
            </svg>
            <img
              v-bind:src="'/img/projects/' + image.url + '.png'"
              v-bind:alt="image.altText"
            />
          </button>
        </li>
      </ul>
      <LightBox
        ref="lightbox"
        v-bind:media="project.images"
        v-bind:show-caption="false"
        v-bind:show-light-box="false"
      />
    </section>
    <aside>
      <div class="content">
        <h1>{{ project.title }}</h1>

        <p v-html="project.introduction"></p>
      </div>
      <div class="actions" v-if="project.hasExternalLink">
        <a
          class="button"
          v-if="project.externalLink != null"
          v-bind:href="project.externalLink"
          target="_blank"
          >View</a
        >
      </div>
    </aside>
  </main>
  <main v-else class="project-overview project-loading">
    <section>
      <div v-for="i in 3" v-bind:key="i">
        <svg>
          <use href="#image-icon" />
        </svg>
      </div>
    </section>

    <aside>
      <div class="content">
        <div v-for="i in 10" v-bind:key="i"></div>
      </div>
    </aside>
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
      id: this.$route.params.project,
      project: [],
      axiosError: false,
      handleLoading: false,
    };
  },
  methods: {
    fetchProjects: function () {
      const baseURI = "/statics/projects/" + this.id + ".json";
      this.$http
        .get(baseURI)
        .then((result) => {
          this.project = result.data;
        })
        .catch((error) => {
          console.log(error);
          this.axiosError = true;
          this.$router.push("/NotFound");
        })
        .finally(() => {
          setTimeout(() => (this.handleLoading = true), 750);
        });
    },
    openGallery(i) {
      this.$refs.lightbox.showImage(i);
    },
  },
  created() {
    this.fetchProjects();
  },
};
</script>