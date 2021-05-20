export const CategoryRoutes = [
  {
    path: '/categorias',
    name: 'categories',
    component: () => import(/* webpackChunkName: "Category" */ '@/views/category/Index'),
    redirect: { name: 'categories.list' },
    meta: {
      auth:true,
      adminAccess: true,
      recepAccess: false,
    },
    children: [
      {
        path: '/',
        name: 'categories.list',
        component: () => import(/* webpackChunkName: "CategoryList" */ '@/views/category/List'),
      },
      {
        path: 'crear',
        name: 'categories.create',
        component: () => import(/* webpackChunkName: "CategoryFormCreate" */ '@/views/category/Form'),
      },
      {
        path: ':name',
        name: 'categories.edit',
        component: () => import(/* webpackChunkName: "CategoryFormUpdate" */ '@/views/category/Form'),
      },
    ],
  },
]
