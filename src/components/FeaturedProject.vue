<template>
  <section data-section-featured aria-label="Featured project">
    <article v-for="(featured, i) in filterProjects" v-bind:key="i">
      <router-link
        v-bind:to="{
            name: 'Project Overview',
            params: { project: featured.reference, title: featured.title },
          }"
        v-bind:aria-label="'View the ' + featured.title + 'project'"
        tabindex="-1"
      >
        <template v-if="!isIe11">
          <img
            v-bind:src="'img/header-projects/' + featured.previewImage.url + '.webp'"
            v-bind:alt="featured.previewImage.altText"
            loading="lazy"
          />
        </template>

        <template v-else>
          <img
            v-bind:src="'img/header-projects/' + featured.previewImage.url + '.jpg'"
            v-bind:alt="featured.previewImage.altText"
            loading="lazy"
          />
        </template>
      </router-link>

      <div class="content">
        <h3>{{ featured.title }}</h3>
        <p v-html="featured.featuredBodyContent"></p>

        <router-link
          class="button"
          v-bind:aria-label="'View the ' + featured.title + 'project'"
          v-bind:to="{
            name: 'Project Overview',
            params: { project: featured.reference, title: featured.title },
          }"
          >View</router-link
        >
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
import { IProjects } from "@/models/projects";

const projectsModule = namespace("projects");
const uiModule = namespace("ui");

@Component
export default class FeaturedProject extends Vue {
  @projectsModule.Getter projects!: Array<IProjects>;
  @uiModule.Getter isIe11!: boolean;

  get filterProjects() {
    return this.projects.filter(
      (project) => project.isFeaturedProject
    );
  }
}
</script>