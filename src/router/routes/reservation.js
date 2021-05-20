export const ReservationRoutes = [
  {
    path: '/reservas',
    name: 'reservation',
    component: () => import(/* webpackChunkName: "Reservation" */ '@/views/reservation/Index'),
    redirect: { name: 'reservations' },
    meta: {
      auth:true,
      adminAccess: true,
      recepAccess: true,
    },
    children: [
      {
        path: '/',
        name: 'reservations',
        component: () => import(/* webpackChunkName: "ReceptionCalendar" */ '@/views/reservation/ReservationsCalendar'),
      },
      {
        path: 'reservas-modo-tablas',
        name: 'reservation.table',
        component: () => import(/* webpackChunkName: "ReceptionTable" */ '@/views/reservation/ReservationsTable'),
      },
      {
        path: 'reservar-habitacion',
        name: 'reservation.create',
        component: () => import(/* webpackChunkName: "ReservationFormCreate" */ '@/views/reservation/Form'),
      },
      {
        path: 'actualizar-reserva/:id',
        name: 'reservation.update',
        component: () => import(/* webpackChunkName: "ReservationFormUpdate" */ '@/views/reservation/Form'),
      },
  ],
  },
]
