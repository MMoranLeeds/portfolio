<template>
  <div id="app">
    <nav>
      <Cookie />
      <Navigation />
      <DarkModeToggle />
    </nav>

    <transition name="fade-up-down" mode="out-in">
      <router-view />
    </transition>

    <footer>
      <Navigation />
    </footer>

    <SvgList />
  </div>
</template>

<script>
import SvgList from "@/shared/SVG.vue";
import Navigation from "@/shared/Navigation.vue";
import DarkModeToggle from "@/shared/DarkModeToggle.vue";
import Cookie from "@/shared/Cookie.vue";

export default {
  components: {
    SvgList,
    Navigation,
    DarkModeToggle,
    Cookie,
  },
};
</script>