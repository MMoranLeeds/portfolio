<template>
  <main class="home" role="main">
    <header>
      <PersonalIntroduction />
      <HeaderProjects />
    </header>

    <FeaturedProject />

    <Projects />

    <Testimonials />

    <Clients />
  </main>
</template>

<script>
// @ is an alias to /src
import PersonalIntroduction from "@/components/PersonalIntroduction.vue";
import HeaderProjects from "@/components/HeaderProjects.vue";
import FeaturedProject from "@/components/FeaturedProject.vue";
import Projects from "@/components/Projects.vue";
import Clients from "@/components/Clients.vue";
import Testimonials from "@/components/Testimonials.vue";

export default {
  name: "Home",
  components: {
    PersonalIntroduction,
    HeaderProjects,
    Projects,
    Clients,
    FeaturedProject,
    Testimonials,
  },
};
</script>
