import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Icons from "@/shared/Icons.vue";

import VueCarousel from 'vue-carousel';
import VueConfetti from "vue-confetti";
import VTooltip from 'v-tooltip';

Vue.component("Icon", Icons);
Vue.use(VueCarousel);
Vue.use(VueConfetti);
Vue.use(VTooltip);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
