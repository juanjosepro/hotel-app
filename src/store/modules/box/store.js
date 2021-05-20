import BoxServices from '@/api/box.js'
import moment from 'moment'
moment.locale('es')

const SET_ALL_BOX = 'SET_ALL_BOX'
const SET_BOX_DAILY_CHECK = 'SET_BOX_DAILY_CHECK'
const SET_BOX_CHASH_DETAILS_BY_DATE= 'SET_BOX_CHASH_DETAILS_BY_DATE'
const MANAGE_ERRORS = "MANAGE_ERRORS";

export const BoxStore = {
  namespaced: true,
  state: {
    guestDetails:{},
    box: {},
    boxes: [],
    summaryBox: [],
    errors: []
  },
  actions: {
    getAllBoxes: async ({ commit }) => {
      try {
        const res = await BoxServices.getAllBoxes()
        await commit(SET_ALL_BOX, res.data)
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    getDailyCheck: async ({ commit }) => {
      try {
        const res = await BoxServices.getDailyCheck()
        await commit(SET_BOX_DAILY_CHECK, res.data)
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
    },
    getCashDetailsByDate: async ({ commit }, payload) => {
      try {
        const res = await BoxServices.getCashDetailsByDate(payload)
        if (res.data === "") {
          await commit(SET_BOX_CHASH_DETAILS_BY_DATE, [])
        } else {
          await commit(SET_BOX_CHASH_DETAILS_BY_DATE, res.data)
        }
      } catch (error) {
        commit(MANAGE_ERRORS, error.response.data.errors);
      }
      
    },
  },
  mutations: {
    [SET_ALL_BOX] (state, payload) {
      const boxes = payload.map(box => { 
        box.dateFormater =  moment(box.date).format('LL') 
        return box
      })
      state.boxes = boxes
    },
    [SET_BOX_DAILY_CHECK] (state, payload) {
      state.box = payload
    },
    [SET_BOX_CHASH_DETAILS_BY_DATE] (state, payload) {
      state.summaryBox = payload
    },
    [MANAGE_ERRORS](state, payload) {
      state.errors = payload;
    },
  },
}
