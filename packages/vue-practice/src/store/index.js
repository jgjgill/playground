import { createStore } from 'vuex'
import user from '~/user'
import message from '~/message'

export default createStore({
  modules: { user, message },
})
