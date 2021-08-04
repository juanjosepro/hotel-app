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
    children: [
      {
        name: 'Dashboard',
        path: '',
        component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/dashboard/Index'),
        meta: {
          auth: true,
          permissions: [
            {
              role: "admin",
              access: true
            },
            {
              role: "recep",
              access: false,
              redirect: "reception"
            },
            {
              role: "unauthorized",
              access: false,
              redirect: "login"
            }
          ]
        },
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
    component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

/* router.beforeEach((to, from, next) => {
  const requiredAuth = to.matched.some(record => record.meta.auth)

  if (requiredAuth) {
      next()
  } else {
    next({ path: '/login' })
  }
}) */

export default router