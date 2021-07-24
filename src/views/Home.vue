<template>
  <main class="home" role="main" id="accessible-content-skip-anchor">
    <header>
      <PersonalDetails />
      <HeaderProjects />
    </header>

    <FeaturedProject />

    <Projects />

    <Testimonials />

    <Clients />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PersonalDetails from "@/components/PersonalDetails.vue";
import HeaderProjects from "@/components/HeaderProjects.vue";
import FeaturedProject from "@/components/FeaturedProject.vue";
import Projects from "@/components/Projects.vue";
import Clients from "@/components/Clients.vue";
import Testimonials from "@/components/Testimonials.vue";

@Component({
  components: {
    PersonalDetails,
    HeaderProjects,
    FeaturedProject,
    Projects,
    Testimonials,
    Clients,
  },
})
export default class Home extends Vue {}
</script>
