<template>
  <section data-section-projects>
    <ul class="projects">
      <li class="project" v-for="(project, i) in filterProjects" v-bind:key="i">
        <article>
          <div class="content">
            <h4>{{ project.title }}</h4>
            <router-link
              class="button"
              v-bind:to="{
                name: 'Project Overview',
                params: { project: project.reference, title: project.title },
              }"
              v-bind:aria-label="'View the ' + project.title + ' project.'"
              >View</router-link
            >
          </div>
          <div class="image">
            <router-link
              v-bind:to="{
                name: 'Project Overview',
                params: { project: project.reference, title: project.title },
              }"
              v-bind:aria-label="'View the ' + project.title + ' project.'"
              tabindex="-1"
            >
              <template v-if="!isIe11">
                <img
                  v-bind:src="
                    '/img/projects/previews/' + project.previewImage.url + '.webp'
                  "
                  v-bind:alt="project.previewImage.altText"
                  loading="lazy"
                />
              </template>

              <template v-else>
                <img
                  v-bind:src="
                    '/img/projects/previews/' + project.previewImage.url + '.jpg'
                  "
                  v-bind:alt="project.previewImage.altText"
                  loading="lazy"
                />
              </template>
            </router-link>
          </div>
        </article>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
import { IProjects } from "@/models/projects";

const projectsModule = namespace("projects");
const uiModule = namespace("ui");

@Component
export default class Projects extends Vue {
  @projectsModule.Getter projects!: Array<IProjects>;
  @uiModule.Getter isIe11!: boolean;

  get filterProjects() {
    return this.projects.filter(
      (project) => !project.isFeaturedProject
    );
  }
}
</script>