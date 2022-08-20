<template>
  <main class="home" role="main" id="accessible-content-skip-anchor">
    <header>
      <PersonalDetails />
      <HeaderProjects />
    </header>

    <FeaturedProject />

    <Projects />

    <Testimonials />

    <Companies />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PersonalDetails from "@/components/PersonalDetails.vue";
import HeaderProjects from "@/components/HeaderProjects.vue";
import FeaturedProject from "@/components/FeaturedProject.vue";
import Projects from "@/components/Projects.vue";
import Companies from "@/components/Companies.vue";
import Testimonials from "@/components/Testimonials.vue";

@Component({
  components: {
    PersonalDetails,
    HeaderProjects,
    FeaturedProject,
    Projects,
    Testimonials,
    Companies,
  },
})
export default class Home extends Vue {}
</script>
