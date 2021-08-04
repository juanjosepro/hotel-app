export const ReservationRoutes = [
  {
    path: '/reservas',
    name: 'reservation',
    component: () => import(/* webpackChunkName: "Reservation" */ '@/views/reservation/Index'),
    redirect: { name: 'reservations' },
    children: [
      {
        path: '/',
        name: 'reservations',
        component: () => import(/* webpackChunkName: "ReceptionCalendar" */ '@/views/reservation/ReservationsCalendar'),
        meta: {
          permissions: [
            {
              role: "admin",
              access: true
            },
            {
              role: "recep",
              access: true
            }
          ]
        },
      },
      {
        path: 'reservas-modo-tablas',
        name: 'reservation.table',
        component: () => import(/* webpackChunkName: "ReceptionTable" */ '@/views/reservation/ReservationsTable'),
        meta: {
          permissions: [
            {
              role: "admin",
              access: true
            },
            {
              role: "recep",
              access: true
            }
          ]
        },
      },
      {
        path: 'reservar-habitacion',
        name: 'reservation.create',
        component: () => import(/* webpackChunkName: "ReservationFormCreate" */ '@/views/reservation/Form'),
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
        path: 'actualizar-reserva/:id',
        name: 'reservation.update',
        component: () => import(/* webpackChunkName: "ReservationFormUpdate" */ '@/views/reservation/Form'),
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
