export const ReceptionRoutes = [
  {
    path: '/recepcion',
    name: 'reception',
    component: () => import(/* webpackChunkName: "Reception" */ '@/views/reception/Index'),
    redirect: { name: 'reception.list' },
    children: [
      {
        path: '/',
        name: 'reception.list',
        component: () => import(/* webpackChunkName: "ReceptionList" */ '@/views/reception/List'),
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
      {
        path: 'más-información-sobre-el-huesped/:number',
        name: 'reception.more-information-about-the-guest',
        component: () => import(/* webpackChunkName: "ReceptionMoreInformationTheGuest" */ '@/views/reception/MoreInformationAboutTheGuest'),
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
      {
        path: 'hospedar/:number',
        name: 'reception.hospedar',
        component: () => import(/* webpackChunkName: "ReceptionForm" */ '@/views/reception/Form'),
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
    ],
  },
]
