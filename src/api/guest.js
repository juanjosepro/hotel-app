import { _axios } from '@/plugins/axios'

export default {
  getAllGuests (status) {
    return _axios.get('guests/' + status)
  },
  getGuestById (id) {
    return _axios.get('guests/' + id)
  },
}
