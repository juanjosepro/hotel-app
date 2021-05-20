export const GuestRoutes = [
  {
    path: 'clientes',
    name: 'guest',
    component: () => import(/* webpackChunkName: "GuestList" */ '@/views/guest/Index'),
    meta: {
      auth:true,
      adminAccess: true,
      recepAccess: true,
    },
  },
]
