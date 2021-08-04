export const GuestRoutes = [
  {
    path: 'clientes',
    name: 'guest',
    component: () => import(/* webpackChunkName: "GuestList" */ '@/views/guest/Index'),
    meta: {
      permissions: [
        {
          role: "admin",
          access: true
        },
        {
          role: "recep",
          access: true,
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
