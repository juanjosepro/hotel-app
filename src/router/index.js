import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/index.js";
import { BoxRoutes } from '@/router/routes/box.js'
import { CategoryRoutes } from '@/router/routes/category.js'
import { GuestRoutes } from '@/router/routes/guest.js'
import { HotelConfigRoutes } from '@/router/routes/hotelConfig.js'
import { ReceptionRoutes } from '@/router/routes/reception.js'
import { ReservationRoutes } from '@/router/routes/reservation.js'
import { RoleRoutes } from '@/router/routes/role.js'
import { RoomRoutes } from '@/router/routes/room.js'
import { UserRoutes } from '@/router/routes/user.js'
//const UserRoutes = () => import(/* webpackChunkName: "group-user" */ '@/router/routes/user.js')

Vue.use(VueRouter)

const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login'),
  },
  {
    path: '/',
    component: () => import('@/views/Index'),
    meta: {
      auth:true,
      adminAccess: true,
      recepAccess: false,
    },
    children: [
      {
        name: 'Dashboard',
        path: '',
        component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/dashboard/Index'),
      },
      
      ...BoxRoutes,
      ...CategoryRoutes,
      ...GuestRoutes,
      ...HotelConfigRoutes,
      ...ReceptionRoutes,
      ...ReservationRoutes,
      ...RoleRoutes,
      ...RoomRoutes,
      ...UserRoutes,
    ],
  },
  {
    name: 'notfound',
    path: '*',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/NotFound'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeResolve((to, from, next) => {
  const auth = store.state.login.auth
  const userAuth = store.state.login.userAuth

  if (to.matched.some(record => record.meta.auth)) {
    if (auth) {
      if (to.matched.some(record => record.meta.adminAccess && userAuth.role.id === "1")) {
        return next()
      }
      else if (to.matched.some(record => record.meta.recepAccess && userAuth.role.id === "2")) {
        return next()
      }
      
      if (userAuth.role.id === "2") {
        router.replace({path: "/recepcion"})
      }
    } else {
      next({ path: '/login' })
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router