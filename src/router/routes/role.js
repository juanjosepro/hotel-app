export const RoleRoutes = [
  {
    path: 'roles',
    name: 'roles',
    component: () => import(/* webpackChunkName: "Roles" */ '@/views/role/Index'),
    meta: {
      auth:true,
      adminAccess: true,
      recepAccess: false,
    },
  },
]
