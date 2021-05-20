export const RoomRoutes = [
  {
    path: '/habitaciones',
    name: 'rooms',
    component: () => import(/* webpackChunkName: "Room" */ '@/views/room/Index'),
    meta: {
      auth:true,
      adminAccess: true,
      recepAccess: true,
    },
  },
]
