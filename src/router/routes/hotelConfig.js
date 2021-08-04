export const HotelConfigRoutes = [
  {
    path: 'configuracion-del-hotel',
    name: 'hotel',
    component: () => import(/* webpackChunkName: "HotelConfig" */ '@/views/hotelConfig/Index'),
    meta: {
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
]
