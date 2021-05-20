import RoleServices from '@/api/role.js'

const CREATE_ROLE = "CREATE_ROLE";
const SET_ALL_ROLES = "SET_ALL_ROLES";
const UPDATE_ROLE = "UPDATE_ROLE";
const MANAGE_ERRORS = "MANAGE_ERRORS";
const CLEAN_ERRORS = "CLEAN_ERRORS";

export const RoleStore = {
  namespaced: true,
  state: {
    role: {},
    roles: [],
    errors: []
  },
  actions: {
    createRole: async ({ commit }, payload) => {
      try {
        const res = await RoleServices.createRole(payload);
        await commit(CREATE_ROLE, res.data.data.attributes);
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }

    },
    getAllRoles: async ({ commit }) => {
      try {
        const res = await RoleServices.getAllRoles();
        const roles = res.data;

        if (roles.hasOwnProperty("data")) {
          await commit(SET_ALL_ROLES, roles);
        }
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    updateRole: async ({ commit }, payload) => {
      try {
        const { id } = payload;
        const { role } = payload;
        const res = await RoleServices.updateRole(id, role);
        await commit(UPDATE_ROLE, res.data.data.attributes);
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    cleanErrors: ({ commit }) => {
      commit(CLEAN_ERRORS);
    }
  },
  mutations: {
    [CREATE_ROLE](state, payload) {
      state.roles.unshift(payload);
    },
    [SET_ALL_ROLES](state, payload) {
      const { data } = payload; //{type: '', data{...}}
      const roles = data.map(role => {
        return role;
      });
      state.roles = roles;
    },
    [UPDATE_ROLE](state, payload) {
      const { roles } = state;
      const newState = roles.map(role => {
        if (role.id === payload.id) {
          role = payload;
        }

        return role;
      });

      state.roles = newState;
    },
    [MANAGE_ERRORS](state, payload) {
      state.errors = payload;
    },
    [CLEAN_ERRORS](state) {
      state.errors = [];
    }
  },
  getters: {
    getRole: state => id => {
      state.role = {}
      state.role = state.roles.find(role => role.id === id);
      return state.role;
    },
  }
};
