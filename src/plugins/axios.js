'use strict'

import Vue from 'vue'
import axios from 'axios'
import store from '@/store/';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

const config = {
  baseURL: process.env.VUE_APP_APIURL, // || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  //withCredentials: true, // Check cross-site Access-Control
}

export const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (store.state.loaderTrue) {
      store.commit('loader/START_LOADING');
    }
    return config
  },
  function (error) {
    // Do something with request error
    store.commit('loader/FINISH_LOADING');
    return Promise.reject(error)
  },
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    store.commit('loader/FINISH_LOADING');
    return response
  },
  function (error) {
    // Do something with response error
    store.commit('loader/FINISH_LOADING');
    return Promise.reject(error)
  },
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      },
    },
    $axios: {
      get () {
        return _axios
      },
    },
  })
}

Vue.use(Plugin)

export default Plugin
