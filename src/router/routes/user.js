export const UserRoutes = [
  {
    path: "usuarios",
    name: "users",
    component: () => import(/* webpackChunkName: "User" */ '@/views/user/Index'),
    redirect: { name: "users.list" },
    children: [
      {
        path: "/",
        name: "users.list",
        component: () => import(/* webpackChunkName: "UserList" */ '@/views/user/List'),
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
        path: "crear",
        name: "users.create",
        component: () => import(/* webpackChunkName: "UserCreate" */ '@/views/user/Create'),
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
        path: "editar/:dni",
        name: "users.edit",
        component: () => import(/* webpackChunkName: "UserUpdate" */ '@/views/user/Update'),
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
  }
];
