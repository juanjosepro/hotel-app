export const BoxRoutes = [
  {
    path: '/caja',
    name: 'box',
    component: () => import(/* webpackChunkName: "Box" */ '@/views/box/Index'),
    redirect: { name: 'box.list' },
    children: [
      {
        path: '/',
        name: 'box.list',
        component: () => import(/* webpackChunkName: "BoxList" */ '@/views/box/List'),
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
       {
        path: 'resumen-de-caja-por-dia/:date',
        name: 'box.summary',
        component: () => import(/* webpackChunkName: "BoxSummaryOfTheDay" */ '@/views/box/SummaryOfTheDay'),
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
    ],
  },
]
