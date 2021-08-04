export const RoleRoutes = [
  {
    path: 'roles',
    name: 'roles',
    component: () => import(/* webpackChunkName: "Roles" */ '@/views/role/Index'),
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
