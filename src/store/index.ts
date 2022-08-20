import Vue from "vue";
import Vuex from "vuex";
import { companiesStore } from "@/store/companies-store";
import { navigationStore } from "@/store/navigation-store";
import { personalDetailsStore } from "@/store/personal-details-store";
import { projectsStore } from "@/store/projects-store";
import { testimonialsStore } from "@/store/testimonials-store";
import { uiStore } from "@/store/ui-store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    companies: companiesStore,
    navigation: navigationStore,
    personalDetails: personalDetailsStore,
    projects: projectsStore,
    testimonials: testimonialsStore,
    ui: uiStore,
  },
});