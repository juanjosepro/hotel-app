export const BoxRoutes = [
  {
    path: '/caja',
    name: 'box',
    component: () => import(/* webpackChunkName: "Box" */ '@/views/box/Index'),
    redirect: { name: 'box.list' },
    meta: {
      auth:true,
      adminAccess: true,
      recepAccess: false,
    },
    children: [
      {
        path: '/',
        name: 'box.list',
        component: () => import(/* webpackChunkName: "BoxList" */ '@/views/box/List'),
      },
       {
        path: 'resumen-de-caja-por-dia/:date',
        name: 'box.summary',
        component: () => import(/* webpackChunkName: "BoxSummaryOfTheDay" */ '@/views/box/SummaryOfTheDay'),
      },
    ],
  },
]
