export const RoomRoutes = [
  {
    path: '/habitaciones',
    name: 'rooms',
    component: () => import(/* webpackChunkName: "Room" */ '@/views/room/Index'),
    meta: {
      permissions: [
        {
          role: "admin",
          access: true
        },
        {
          role: "recep",
          access: true
        },
        {
          role: "unauthorized",
          access: false,
          redirect: "login"
        }
      ]
    },
  },
]
