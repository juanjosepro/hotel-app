const START_LOADING = 'START_LOADING'
const FINISH_LOADING = 'FINISH_LOADING'

export const LoaderStore = {
  namespaced: true,
  state: {
    loading: 0
  },
  mutations: {
    [START_LOADING] (state) {
      state.loading++
    },
    [FINISH_LOADING] (state) {
      if (state.loading > 0) {
        state.loading--
      }
    },
  }
}