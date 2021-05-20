import CategoryServices from '@/api/category.js'

const CREATE_CATEGORY = "CREATE_CATEGORY";
const SET_ALL_CATEGORIES = "SET_ALL_CATEGORIES";
const SET_ALL_ROOMS_BY_CATEGORY = "SET_ALL_ROOMS_BY_CATEGORY";
const SET_CATEGORY = "SET_CATEGORY";
const UPDATE_CATEGORY = "UPDATE_CATEGORY";
const MANAGE_ERRORS = "MANAGE_ERRORS";
const CLEAN_ERRORS = "CLEAN_ERRORS";

export const CategoryStore = {
  namespaced: true,
  state: {
    category: {},
    categories: [],
    rooms:[],
    errors: []
  },
  actions: {
    createCategory: async ({ commit }, payload) => {
      try {
        const res = await CategoryServices.createCategory(payload);
        await commit(CREATE_CATEGORY, res.data.data);
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    getAllCategories: async ({ commit }) => {
      try {
        const res = await CategoryServices.getAllCategories();
        if (res.data.hasOwnProperty("data")) {
          await commit(SET_ALL_CATEGORIES, res.data);
        }
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    getAllRoomsByCategory: async ({ commit }, payload) => {
      try {
        const res = await CategoryServices.getAllRoomsByCategory(payload);
        if (res.hasOwnProperty("data")) {
          await commit(SET_ALL_ROOMS_BY_CATEGORY, res.data);
        }
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    getCategoryByName: async ({ commit }, payload) => {
      try {
        const res = await CategoryServices.getCategoryByName(payload);
        await commit(SET_CATEGORY, res.data.data.attributes);
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    updateCategory: async ({ commit }, payload) => {
      try {
        const { name } = payload;
        const { category } = payload;
        const res = await CategoryServices.updateCategory(name, category);
        await commit(UPDATE_CATEGORY, res.data.data);
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }

    },
    cleanErrors: ({ commit }) => {
      commit(CLEAN_ERRORS);
    }
  },
  mutations: {
    [CREATE_CATEGORY](state, payload) {
      state.category = payload;
    },
    [SET_ALL_CATEGORIES](state, payload) {
      const { data } = payload; //{type: '', data{...}}
      state.categories = data;
    },
    [SET_ALL_ROOMS_BY_CATEGORY](state, payload) {
      const { rooms } = payload; //{type: '', data{...}}
      state.rooms = rooms;
    },
    [SET_CATEGORY](state, payload) {
      state.category = payload;
    },
    [UPDATE_CATEGORY](state, payload) {
      const { categories } = state;

      const newState = categories.map(category => {
        if (category.id === payload.id) {
          category = payload;
        }

        return category;
      });
      state.categories = newState;
    },
    [MANAGE_ERRORS](state, payload) {
      state.errors = payload;
    },
    [CLEAN_ERRORS](state) {
      state.errors = [];
    }
  },
  getters: {
    getCategory: state => id => {
      state.category = {};
      state.category = state.categories.find(category => category.id === id);
      return state.category;
    }
  }
};
