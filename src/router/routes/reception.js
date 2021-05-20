export const ReceptionRoutes = [
  {
    path: '/recepcion',
    name: 'reception',
    component: () => import(/* webpackChunkName: "Reception" */ '@/views/reception/Index'),
    redirect: { name: 'reception.list' },
    meta: {
      auth: true,
      adminAccess: true,
      recepAccess: true,
    },
    children: [
      {
        path: '/',
        name: 'reception.list',
        component: () => import(/* webpackChunkName: "ReceptionList" */ '@/views/reception/List'),
      },
      {
        path: 'más-información-sobre-el-huesped/:number',
        name: 'reception.more-information-about-the-guest',
        component: () => import(/* webpackChunkName: "ReceptionMoreInformationTheGuest" */ '@/views/reception/MoreInformationAboutTheGuest'),
      },
      {
        path: 'hospedar/:number',
        name: 'reception.hospedar',
        component: () => import(/* webpackChunkName: "ReceptionForm" */ '@/views/reception/Form'),
      },
    ],
  },
]
