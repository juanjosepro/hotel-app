const SET_USER_AUTH = "SET_USER_AUTH";
const SET_ERROR = "SET_ERROR";

import { _axios } from '@/plugins/axios'
import axios from "axios";
/* import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_WEBURL; */
axios.defaults.withCredentials = true;
var newAxios = axios.create({
  baseURL: process.env.VUE_APP_WEBURL
});

export const LoginStore = {
  namespaced: true,
  state: {
    userAuth: null,
    auth: false,
    errors: [],
  },
  actions: {
    login: async ({ commit, dispatch }, payload) => {
      try {
        await newAxios.get('sanctum/csrf-cookie');
        const res = await newAxios.post('login', payload);
        if (res.data.errorMsg) {
          commit(SET_ERROR, res.data)
        } else {
          await dispatch("getUserAuth");
        }
      } catch (error) {
        console.log(error)
      }
    },
    logout: async ({ dispatch, commit }) => {
      try {
        await newAxios.post('logout');
        return dispatch("getUserAuth");
      } catch (error) {
        commit(SET_ERROR, error.response.data);
      }
    },
    getUserAuth: async ({ commit }) => {
      try {
        const res = await _axios.get("user");
        commit(SET_USER_AUTH, res.data.data.attributes);
        return res.data.data.attributes;
      } catch (error) {
        commit(SET_USER_AUTH, null)
      }
    }
  },
  mutations: {
    [SET_USER_AUTH](state, payload) {
      if (payload) {
        state.userAuth = payload;
        localStorage.setItem('role', payload.role.id)
        state.auth = Boolean(payload);  
      } else {
        localStorage.removeItem('role');        
      }
    },
    [SET_ERROR](state, payload) {
      state.errors = payload
    }
  },
};
