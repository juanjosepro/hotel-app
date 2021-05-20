const CHANGE_STATUS_DIALOG_FORM = 'CHANGE_STATUS_DIALOG_FORM'
const CHANGE_STATUS_DIALOG_WARNING = 'CHANGE_STATUS_DIALOG_WARNING'

export const DialogBooleanStore = {
  namespaced: true,
  state: {
    dialogForm: false,
    dialogWarning: false,
  },
  actions: {
    openDialogForm: ({ commit }, payload) => {
      commit(CHANGE_STATUS_DIALOG_FORM, payload)
    },
    openDialogWarning: ({ commit }, payload) => {
      commit(CHANGE_STATUS_DIALOG_WARNING, payload)
    },
  },
  mutations: {
    [CHANGE_STATUS_DIALOG_FORM] (state, payload) {
      state.dialogForm = payload
    },
    [CHANGE_STATUS_DIALOG_WARNING] (state, payload) {
      state.dialogWarning = payload
    },
  },
}
