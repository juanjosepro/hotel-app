export const CategoryRoutes = [
  {
    path: '/categorias',
    name: 'categories',
    component: () => import(/* webpackChunkName: "Category" */ '@/views/category/Index'),
    redirect: { name: 'categories.list' },
    children: [
      {
        path: '/',
        name: 'categories.list',
        component: () => import(/* webpackChunkName: "CategoryList" */ '@/views/category/List'),
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
        path: 'crear',
        name: 'categories.create',
        component: () => import(/* webpackChunkName: "CategoryFormCreate" */ '@/views/category/Form'),
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
        path: ':name',
        name: 'categories.edit',
        component: () => import(/* webpackChunkName: "CategoryFormUpdate" */ '@/views/category/Form'),
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
