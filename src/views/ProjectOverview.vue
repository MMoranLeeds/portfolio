<template>
  <main
    class="project-overview"
    role="main"
    id="accessible-content-skip-anchor"
  >
    <section>
      <ul>
        <li v-for="(image, i) in filterProjects[0].images" v-bind:key="i">
          <button
            v-bind:aria-label="
              `View image ` +
              [i + 1] +
              ` of the ` +
              filterProjects[0].title +
              ` project.`
            "
            v-on:click="openGallery(i)"
          >
            <Icon name="zoom" />
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
        v-bind:media="filterProjects[0].images"
        v-bind:show-caption="true"
        v-bind:show-light-box="false"
      />
    </section>
    <div class="project-details">
      <div class="content">
        <h1>{{ filterProjects[0].title }}</h1>

        <p v-html="filterProjects[0].introduction"></p>
      </div>
      <div class="actions" v-if="filterProjects[0].hasExternalLink">
        <a
          class="button"
          v-if="filterProjects[0].externalLink != null"
          v-bind:href="filterProjects[0].externalLink"
          target="_blank"
          >View</a
        >
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
import { IProjects } from "@/models/projects";
import LightBox from "vue-it-bigger";

const projectsModule = namespace("projects");
const uiModule = namespace("ui");

@Component({
  components: {
    LightBox,
  },
})
export default class ProjectOverview extends Vue {
  @projectsModule.Getter projects!: Array<IProjects>;
  @uiModule.Getter isIe11!: boolean;

  currentProject = this.$route.params.project;
  projectDetails = [];
  axiosError = false;
  handleLoading = false;

  $refs!: {
    lightbox: any;
  };

  setDynamicDocumentTitle() {
    let documentTitle =
      this.filterProjects[0].title + " - " + `${process.env.VUE_APP_TITLE}`;
    document.title = documentTitle;
  }

  openGallery(i: number): void {
    this.$refs.lightbox.showImage(i);
  }

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
  }

  get filterProjects() {
    return this.projects.filter(
      (project) => project.reference === this.currentProject
    );
  }

  mounted(){
    this.setDynamicDocumentTitle();
  }

  beforeDestroy() {
    this.removeOverflowClasses();
  }
}
</script>