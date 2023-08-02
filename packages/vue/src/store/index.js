import { createStore } from 'vuex'
import message from '~/store/message'
import count from '~/store/count'

export default createStore({
  state() {
    return {
      msg: 'Hello Vue?!',
    }
  },
  getters: {},
  mutations: {},
  actions: {
    // context => state, getters, commit, dispatch
  },
  modules: { message, count },
})
