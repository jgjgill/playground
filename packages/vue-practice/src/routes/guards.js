import router from '~/routes'
import store from '~/store'

router.beforeEach((to) => {
  console.log(store)

  if (to.meta.requiresAuth && !store.state.user.isLoggedIn) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})
