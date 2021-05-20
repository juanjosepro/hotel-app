const START_SNACKBAR = 'START_SNACKBAR'
const END_SNACKBAR = 'END_SNACKBAR'

export const SnackbarStore = {
  namespaced: true,
  state: {
    show: false,
    color: "",
    msg: ""
  },
  actions: {
    showSnackbar: async ({ commit }, payload) => {
      await commit(END_SNACKBAR)
      await commit(START_SNACKBAR, payload)
    },
  },
  mutations: {
    [START_SNACKBAR] (state, payload) {
      let { color, msg } = payload
      state.show = true
      state.color = color || ""
      state.msg = msg || ""
    },
    [END_SNACKBAR] (state) {
      state.show = false
      state.color = ""
      state.msg = ""
    },
  }
}
