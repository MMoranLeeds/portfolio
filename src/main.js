import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueCarousel from 'vue-carousel'
import VTooltip from 'v-tooltip'


Vue.prototype.$http = axios
Vue.use(VueCarousel)
Vue.use(VTooltip)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
