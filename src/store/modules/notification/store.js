const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

export const NotificationStore = {
  namespaced: true,
  state: {
    notification: {},
    notifications: [],
  },
  actions: {
    createNotification: ({ commit }, payload) => {
      commit(CREATE_NOTIFICATION, payload)
    },
    removeNotification: ({ commit }, payload) => {
      commit(REMOVE_NOTIFICATION, payload)
    }
  },
  mutations: {
    [CREATE_NOTIFICATION] (state, payload) {
      state.notifications = payload
    },
    [REMOVE_NOTIFICATION] (state, payload) {
      state.notifications = state.notifications.filter(notification => notification.id != payload);
    }
  },
}
