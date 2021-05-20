import { _axios } from '@/plugins/axios'

export default {
  registerReservation (reservation) {
    return _axios.post('reservations/', reservation)
  },
  getAllReservation () {
    return _axios.get('reservations/')
  },
  getReservationById (id) {
    return _axios.get('reservations/' + id)
  },
  updateReservation (id, reservation) {
    return _axios.put('reservations/' + id, reservation)
  },
  deleteReservation (id) {
    return _axios.delete('reservations/' + id)
  },
}
