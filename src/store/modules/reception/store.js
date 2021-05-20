import ReceptionServices from '@/api/reception.js'

const SET_ALL_ROOMS = 'SET_ALL_ROOMS'
const SET_MORE_INFORMATION_ABOUT_THE_GUEST = 'SET_MORE_INFORMATION_ABOUT_THE_GUEST'
const UPDATE_GUEST = 'UPDATE_GUEST'
const FREE_ROOM = 'FREE_ROOM'
const MANAGE_ERRORS = "MANAGE_ERRORS";
const CLEAN_ERRORS = "CLEAN_ERRORS";

export const ReceptionStore = {
  namespaced: true,
  state: {
    user: {},
    guest: {},
    rooms: [],
    errors: [],
  },
  actions: {
    registeNewGuest: async ({ commit }, payload) => {
      try {
        await ReceptionServices.registeNewGuest(payload)
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    getAllReceptionRooms: async ({ commit }, payload) => {
      try {
        const res = await ReceptionServices.getAllReceptionRooms(payload)
        if (res.hasOwnProperty("data")) {
          await commit(SET_ALL_ROOMS, res.data)
        }
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    moreInformationAboutTheGuest: async ({ commit }, payload) => {
      try {
        const res = await ReceptionServices.moreInformationAboutTheGuest(payload)
        await commit(SET_MORE_INFORMATION_ABOUT_THE_GUEST, res.data.data.attributes)
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    updateGuest: async ({ commit }, payload) => {
      try {
        const { id } = payload
        const { guest } = payload
        const res = await ReceptionServices.updateGuest(id, guest)
        await commit(UPDATE_GUEST, res.data.data)
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    freeRoom: async ({ commit }, payload) => {
      try {
        await ReceptionServices.freeRoom(payload)
        await commit(FREE_ROOM)
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    cleanErrors: ({ commit }) => {
      commit(CLEAN_ERRORS);
    },
  },
  mutations: {
    [SET_ALL_ROOMS] (state, payload) {
      state.rooms = payload
    },
    [SET_MORE_INFORMATION_ABOUT_THE_GUEST] (state, payload) {
      state.guest = payload
    },
    [UPDATE_GUEST] (state, payload) {
      state.guest = payload
    },
    [FREE_ROOM] (state) {
      state.guest = {} 
    },
    [MANAGE_ERRORS](state, payload) {
      state.errors = payload;
    },
    [CLEAN_ERRORS](state) {
      state.errors = [];
    }
  },
  getters: {
    getUser: (state) => (id) => {
      state.user = {}
      state.user = state.users.find(user => user.id === id)
      return state.user
    },
  },
}
