import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import ProjectOverview from '../views/ProjectOverview.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home"
    },
  },
  {
    path: '/project/:project',
    name: 'Project Overview',
    component: ProjectOverview,
    meta: {
      title: "Project"
    },
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound,
    meta: {
      title: "404 Not Found"
    },
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

router.beforeEach((to: any, from, next) => {
  document.title = to.meta.title + ' - ' + process.env.VUE_APP_TITLE
  next()
})

export default router
