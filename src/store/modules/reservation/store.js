import ReservationServices from '@/api/reservation.js'

const SET_ALL_RESERVATION = 'SET_ALL_RESERVATION'
const SET_RESERVATION = 'SET_RESERVATION'
const UPDATE_RESERVATION = 'UPDATE_RESERVATION'
const DELETE_RESERVATION = 'DELETE_RESERVATION'
const MANAGE_ERRORS = "MANAGE_ERRORS";
const CLEAN_ERRORS = "CLEAN_ERRORS";

export const ReservationStore = {
  namespaced: true,
  state: {
    reservation: {},
    reservations: [],
    errors: [],
  },
  actions: {
    registerReservation: async ({ commit }, payload) => {
      try {
        await ReservationServices.registerReservation(payload)
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    getAllReservation: async ({ commit }) => {
      try {
        const res = await ReservationServices.getAllReservation()
        
        if (res.data.hasOwnProperty("data")) {
          await commit(SET_ALL_RESERVATION, res.data.data)
        }
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    getReservationById: async ({ commit }, payload) => {
      try {
        const res = await ReservationServices.getReservationById(payload)
        await commit(SET_RESERVATION, res.data.data.attributes)
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
      
    },
    updateReservation: async ({ commit }, payload) => {
      try {
        const { id } = payload
        const { reservation } = payload
        const res = await ReservationServices.updateReservation(id, reservation)
        await commit(UPDATE_RESERVATION, res.data.data.attributes)
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    deleteReservation: async ({ commit }, payload) => {
      try {
        await ReservationServices.deleteReservation(payload)
        commit(DELETE_RESERVATION, payload)
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    cleanErrors: ({ commit }) => {
      commit(CLEAN_ERRORS);
    },
  },
  mutations: {
    [SET_ALL_RESERVATION] (state, payload) {
      state.reservations = payload
    },
    [SET_RESERVATION] (state, payload) {
      state.reservation = payload
    },
    [UPDATE_RESERVATION] (state, payload) {
      state.reservation = payload
    },
    [DELETE_RESERVATION] (state, payload) {
      const newState = state.reservations.filter(reservation => reservation.id !== payload)
      state.reservations = newState
    },
    [MANAGE_ERRORS](state, payload) {
      state.errors = payload;
    },
    [CLEAN_ERRORS](state) {
      state.errors = [];
    }
  }
}
