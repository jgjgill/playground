import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '~/routes/HomePage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'home', component: HomePage }],
})
