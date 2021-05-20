export const UserRoutes = [
  {
    path: "usuarios",
    name: "users",
    component: () => import(/* webpackChunkName: "User" */ '@/views/user/Index'),
    redirect: { name: "users.list" },
    meta: {
      auth:true,
      adminAccess: true,
      recepAccess: false,
    },
    children: [
      {
        path: "/",
        name: "users.list",
        component: () => import(/* webpackChunkName: "UserList" */ '@/views/user/List'),
      },
      {
        path: "crear",
        name: "users.create",
        component: () => import(/* webpackChunkName: "UserCreate" */ '@/views/user/Create'),
      },
      {
        path: "editar/:dni",
        name: "users.edit",
        component: () => import(/* webpackChunkName: "UserUpdate" */ '@/views/user/Update'),
      },
    ]
  }
];
