export const HotelConfigRoutes = [
  {
    path: 'configuracion-del-hotel',
    name: 'hotel',
    component: () => import(/* webpackChunkName: "HotelConfig" */ '@/views/hotelConfig/Index'),
    meta: {
      auth:true,
      adminAccess: true,
      recepAccess: false,
    },
  },
]
