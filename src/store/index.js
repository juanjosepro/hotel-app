import Vue from 'vue'
import Vuex from 'vuex'
import barImage from '@/assets/bar-image.jpg'

import { LoginStore } from './modules/login'
import { HotelConfigStore } from './modules/hotelConfig/store'
import { RoleStore } from './modules/role/store'
import { UserStore } from './modules/user/store'
import { CategoryStore } from './modules/category/store'
import { RoomStore } from './modules/room/store'
import { ReceptionStore } from './modules/reception/store'
import { ReservationStore } from './modules/reservation/store'
import { GuestStore } from './modules/guest/store'
import { BoxStore } from './modules/box/store'
import { LoaderStore } from './modules/loader'
import { SnackbarStore } from './modules/snackbar'
import { DialogBooleanStore } from './modules/dialogBoolean'
import { NotificationStore } from './modules/notification/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: barImage,
    drawer: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
  },
  actions: {

  },
  modules: { 
    login: {...LoginStore},
    snackbar: { ...SnackbarStore },
    loader: { ...LoaderStore },
    hotel: { ...HotelConfigStore },
    roles: { ...RoleStore },
    users: { ...UserStore },
    dialog: { ...DialogBooleanStore },
    categories: { ...CategoryStore },
    rooms: { ...RoomStore },
    reception: { ...ReceptionStore },
    reservation: { ...ReservationStore },
    guest: { ...GuestStore },
    box: { ...BoxStore },
    notification: { ...NotificationStore },
  },
})
