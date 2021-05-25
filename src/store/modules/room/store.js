import RoomServices from '@/api/room.js'

const CREATE_ROOM = "CREATE_ROOM";
const SET_ALL_ROOMS = "SET_ALL_ROOMS";
const SET_ROOM = "SET_ROOM";
const CLEAN_ROOM = "CLEAN_ROOM";
const MANAGE_ERRORS = "MANAGE_ERRORS";
const CLEAN_ERRORS = "CLEAN_ERRORS";

export const RoomStore = {
  namespaced: true,
  state: {
    room: {},
    rooms: [],
    errors: []
  },
  actions: {
    createRoom: async ({ commit }, payload) => {
      try {
        const res = await RoomServices.createRoom(payload);
        console.log(res.data)
        await commit(CREATE_ROOM, res.data.data.attributes);
      } catch (error) {
        console.log(error)
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    getAllRooms: async ({ commit }, payload = "") => {
      try {
        const res = await RoomServices.getAllRooms(payload);
        if (res.data.hasOwnProperty("data")) {
          await commit(SET_ALL_ROOMS, res.data);
        } else {
          await commit(SET_ALL_ROOMS, []);
        }
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    getRoomByNumber: async ({ commit }, payload) => {
      try {
        const res = await RoomServices.getRoomByNumber(payload);
        commit(SET_ROOM, res.data.data.attributes);
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    updateRoom: async ({ commit }, payload) => {
      try {
        const { number, room } = payload;
        await RoomServices.updateRoom(number, room);
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    cleanErrors: ({ commit }) => {
      commit(CLEAN_ERRORS);
    }
  },
  mutations: {
    [CREATE_ROOM](state, payload) {
      if (payload.status === "available") {
        payload.status = "Disponible";
      } else {
        payload.status = "Ocupado";
      }

      state.rooms.unshift(payload);
    },
    [SET_ALL_ROOMS](state, payload) {
      if (payload.length === 0) {
        state.rooms = payload; // []
      } else {
        const { data } = payload; //{type: '', data{...}}
        state.rooms = data.sort((a, b) => a.level - b.level);
      }
    },
    [SET_ROOM](state, payload) {
      state.room = payload;
    },
    [CLEAN_ROOM](state) {
      state.room = [];
    },
    [MANAGE_ERRORS](state, payload) {
      state.errors = payload;
    },
    [CLEAN_ERRORS](state) {
      state.errors = [];
    }
  }
};
