import { createRouter, createWebHistory } from 'vue-router'
import Home from '~/routes/Home'
import About from '~/routes/About'
import Docs from '~/routes/Docs'
import DocsId from '~/routes/DocsId'
import NotFound from '~/routes/NotFound'
import LogIn from '~/routes/LogIn'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/about', component: About, name: 'about', meta: { requiresAuth: true } },
    { path: '/login', component: LogIn },
    { path: '/documents', component: Docs },
    { path: '/documents/:id', component: DocsId, name: 'docsId' },
    { path: '/:notFound(.*)', component: NotFound },
  ],
})
