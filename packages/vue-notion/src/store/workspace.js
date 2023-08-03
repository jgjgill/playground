export default {
  namespaced: true,
  state() {
    return {
      workspaces: [],
    }
  },
  getters: {},
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    },
  },
  actions: {
    createWorkspace() {},
    async readWorkspaces({ commit }) {
      const workspaces = await fetch('https://kdt-frontend.programmers.co.kr/documents', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-username': 'jgjgill',
        },
      }).then((res) => res.json())

      commit('assignState', { workspaces })
    },
    readWorkspace() {},
    updateWorkspace() {},
    deleteWorkspace() {},
  },
}
