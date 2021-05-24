import UserServices from '@/api/user.js'

const CREATE_USER = "CREATE_USER";
const SET_ALL_USERS = "SET_ALL_USERS";
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";
const MANAGE_ERRORS = "MANAGE_ERRORS";
const CLEAN_ERRORS = "CLEAN_ERRORS";

export const UserStore = {
  namespaced: true,
  state: {
    user: {},
    users: [],
    errors: []
  },
  actions: {
    createUser: async ({ commit }, payload) => {
      try {
        const res = await UserServices.createUser(payload);
        await commit(CREATE_USER, res.data.data);
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    getAllUsers: async ({ commit }, payload = "") => {
      try {
        const res = await UserServices.getAllUsers();
        if (res.data.hasOwnProperty("data")) {
          await commit(SET_ALL_USERS, res.data);
        } else {
          await commit(SET_ALL_USERS, []);
        }
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    getUserById: async ({ commit }, payload) => {
      try {
        const res = await UserServices.getUserById(payload);
        await commit(SET_USER, res.data.data.attributes);
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    updateUser: async ({ commit }, payload) => {
      try {
        const { id } = payload;
        const { user } = payload;
        const res = await UserServices.updateUser(id, user);
        await commit(UPDATE_USER, res.data.data);
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    disableUser: async ({ commit }, payload) => {
      try {
        await UserServices.disableUser(payload);
        await commit(DELETE_USER, payload);
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    cleanErrors: ({ state }) => {
      state.errors = [];
    }
  },
  mutations: {
    [CREATE_USER](state, payload) {
      state.users.unshift(payload);
    },
    [SET_ALL_USERS](state, payload) {
      if (payload.length === 0) {
        state.users = payload; // []
      } else {
        const { data } = payload; //{type: '', data{...}}
        const users = data.map(user => {
          return user;
        });
        state.users = users;
      }
    },
    [SET_USER](state, payload) {
      state.user = payload;
    },
    [UPDATE_USER](state, payload) {
      const { users } = state;
      const newState = users.map(user => {
        if (user.id === payload.id) {
          user = payload;
        }

        return user;
      });
      state.users = newState;
    },
    [DELETE_USER](state, payload) {
      const newState = state.users.filter(user => user.id !== payload);
      state.users = newState;
    },
    [MANAGE_ERRORS](state, payload) {
      state.errors = payload;
    },
    [CLEAN_ERRORS](state) {
      state.errors = [];
    }
  },
  getters: {
    getUser: state => id => {
      state.user = {};
      state.user = state.users.find(user => user.id === id);
      return state.user;
    }
  }
};
