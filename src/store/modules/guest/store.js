import GuestServices from '@/api/guest.js'

const SET_ALL_GUEST = 'SET_ALL_GUEST'
const CHECK_GUESTS_TIME_LIMIT = 'CHECK_GUESTS_TIME_LIMIT'

export const GuestStore = {
  namespaced: true,
  state: {
    guest: {},
    guests: [],
    guestHosped: [],
  },
  actions: {
    getAllGuests: async ({ commit }, payload) => {
      try {
        const res = await GuestServices.getAllGuests(payload)
        if (res.data.hasOwnProperty("data")) {
          if (payload === "") {
            commit(SET_ALL_GUEST, res.data.data)
          } else {
            //for notification of time limit
            commit(CHECK_GUESTS_TIME_LIMIT, res.data.data)
          }
        } else {
          if (payload === "") {
            commit(SET_ALL_GUEST, [])
          } else {
            //for notification of time limit
            commit(CHECK_GUESTS_TIME_LIMIT, [])
          }
        }
      } catch (error) {
        commit(CHECK_GUESTS_TIME_LIMIT, [])
      }
    },
  },
  mutations: {
    [SET_ALL_GUEST] (state, payload) {
      const guests = payload.map(guest => {
        if (guest.status === 'hosped') {
          guest.status = 'Hospedado'
        } else {
          guest.status = 'Retirado'
        }
        return guest
      })
      
      state.guests = guests
    },
    [CHECK_GUESTS_TIME_LIMIT] (state, payload) {
      //for notification of time limit
      state.guestHosped = payload
    },
  },
  getters: {
    getGuest: (state) => (id) => {
      state.guest = {}
      state.guest = state.guests.find(guest => guest.id === id)
      return state.guest
    },
  },
}
