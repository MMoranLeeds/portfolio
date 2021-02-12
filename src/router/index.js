import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProjectOverview from '../views/ProjectOverview.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/project/:project',
    name: 'Project Overview',
    component: ProjectOverview,
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return {
      x: 0,
      y: 0
    };
  }
})

router.beforeEach((to, from, next) => {
  let documentTitle = `${process.env.VUE_APP_TITLE}`;
  if(to.params.title){
    documentTitle += ` - ${to.params.title}`
  }
  else if(to.name === 'Not Found'){
    documentTitle += ` - 404`
  }
  document.title = documentTitle;
  next();
})

export default router