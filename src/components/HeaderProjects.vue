<template>
  <ul data-featured-projects>
    <li
      v-for="(project, i) in filterProjects"
      v-bind:key="i"
      v-bind:style="{ backgroundColor: project.headerProjectDetails.backgroundColor }"
    >
      <router-link
        v-bind:to="{
          name: 'Project Overview',
          params: { project: project.reference, title: project.title },
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
            v-bind:src="'/img/header-projects/' + project.headerProjectDetails.image + '.webp'"
            v-bind:alt="project.headerProjectDetails.altText"
          />
        </template>

        <template v-else>
          <img
            v-bind:src="'/img/header-projects/' + project.headerProjectDetails.image + '.png'"
            v-bind:alt="project.headerProjectDetails.altText"
          />
        </template>
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
import { gsap } from "gsap";
import { IProjects } from "@/models/projects";

const projectsModule = namespace("projects");
const uiModule = namespace("ui");

@Component
export default class HeaderProjects extends Vue {
  @projectsModule.Getter projects!: Array<IProjects>;
  @uiModule.Getter isIe11!: boolean;

  displayContent = gsap.timeline();

  animateContent() {
    this.displayContent.play();
  }

  mounted() {
    this.displayContent
      .from("ul[data-featured-projects] li:nth-of-type(1)", {
        duration: 0.75,
        opacity: 0,
        x: -50,
      })
      .from(
        "ul[data-featured-projects] li:nth-of-type(2)",
        {
          duration: 0.75,
          opacity: 0,
          y: -50,
        },
        "+= -0.75"
      )
      .from(
        "ul[data-featured-projects] li:nth-of-type(3)",
        {
          duration: 0.75,
          opacity: 0,
          y: 50,
        },
        "+= -0.75"
      );
    this.animateContent();
  }

  get filterProjects() {
    return this.projects.filter(
      (project) => project.isHeaderProject
    );
  }
}
</script>