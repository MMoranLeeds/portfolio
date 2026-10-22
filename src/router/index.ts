import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import { shareStudioPath } from '@/config/studioRoute'
import { isPendingSectionSync } from './sectionSync'
import CvView from '@/views/CvView.vue'
import HomeView from '@/views/HomeView.vue'
import CaseStudyView from '@/views/CaseStudyView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

export function createPortfolioRouter(server = false) {
  let selectedWorkPosition: { left: number; top: number } | undefined
  const router = createRouter({
    history: server ? createMemoryHistory() : createWebHistory(),
    routes: [
      { path: '/', name: 'home', component: HomeView },
      { path: '/cv', name: 'cv', component: CvView },
      ...(import.meta.env.DEV || import.meta.env.VITE_ENABLE_SHARE_STUDIO === 'true'
        ? [
            {
              path: shareStudioPath,
              name: 'share-studio',
              component: () => import('@/tools/share-image/ShareImageStudio.vue'),
            },
          ]
        : []),
      { path: '/work/:slug', name: 'case-study', component: CaseStudyView },
      { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
    ],
    scrollBehavior(to, from, savedPosition) {
      if (to.meta.sectionScrollSync) return false
      if (savedPosition) return savedPosition
      if (
        to.name === 'home' &&
        to.hash === '#case-studies' &&
        from.name === 'case-study' &&
        selectedWorkPosition
      ) {
        return selectedWorkPosition
      }
      if (to.hash) return { el: to.hash }
      return { top: 0 }
    },
  })
  // Keep existing section URLs working when their visible names change.
  const legacySectionHashes: Record<string, string> = {
    '#testimonials': '#testimonials-and-experience',
    '#ai-and-modern-workflows': '#technical-skills',
    '#technical-skills-and-modern-workflows': '#technical-skills',
  }
  router.beforeEach((to) => {
    const hash = legacySectionHashes[to.hash]
    if (to.name === 'home' && hash) return { path: to.path, query: to.query, hash, replace: true }
  })
  if (!server) {
    router.beforeEach((to, from) => {
      if (isPendingSectionSync(router, to.fullPath)) to.meta.sectionScrollSync = true
      if (from.name === 'home' && to.name === 'case-study') {
        selectedWorkPosition = { left: window.scrollX, top: window.scrollY }
      }
    })
  }
  return router
}
