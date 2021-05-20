import HotelServices from '@/api/hotelConfig.js'
const SET_HOTEL = "SET_HOTEL";
const UPDATE_HOTEL = "UPDATE_HOTEL";
const MANAGE_ERRORS = "MANAGE_ERRORS";
const CLEAN_ERRORS = "CLEAN_ERRORS";

export const HotelConfigStore = {
  namespaced: true,
  state: {
    hotel: {},
    errors: []
  },
  actions: {
    getHotel: async ({ commit }) => {
      try {
        const res = await HotelServices.getHotel();
        if (res.data.hasOwnProperty("data")) {
          await commit(SET_HOTEL, res.data.data.attributes);
        }
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    updateHotel: async ({ commit }, payload) => {
      try {
        const { id, setting } = payload;
        const res = await HotelServices.updateHotel(id, setting);
        await commit(UPDATE_HOTEL, res.data.data.attributes);
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    clearErrors: ({ state }) => {
      state.errors = [];
    }
  },
  mutations: {
    [SET_HOTEL](state, payload) {
      state.hotel = payload;
    },
    [UPDATE_HOTEL](state, payload) {
      state.hotel = payload;
    },
    [MANAGE_ERRORS](state, payload) {
      state.errors = payload;
    },
    [CLEAN_ERRORS](state) {
      state.errors = [];
    }
  }
};
