import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', {
  state: () => ({ count: 1 }),
  getters: {
    double(state) {
      return state.count * 2
    }
  },
  actions: {
    increase() {
      this.count += 1
    },
    decrease() {
      this.count -= 1
    }
  }
})
