import { createRouter, createWebHistory } from 'vue-router'
import Home from '~/routes/Home'
import About from '~/routes/About'
import Docs from '~/routes/Docs'
import DocsId from '~/routes/DocsId'
import NotFound from '~/routes/NotFound'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/about', component: About, name: 'about' },
    { path: '/documents', component: Docs },
    { path: '/documents/:id', component: DocsId, name: 'docsId' },
    { path: '/:notFound(.*)', component: NotFound },
  ],
})
