import { _axios } from '@/plugins/axios'

export default {
  registeNewGuest (guest) {
    return _axios.post('reception/', guest)
  },
  getAllReceptionRooms () {
    return _axios.get('reception/')
  },
  moreInformationAboutTheGuest (number) {
    return _axios.get('reception/more-information-about-the-guest/' + number)
  },
  updateGuest (id, guest) {
    return _axios.put('reception/' + id, guest)
  },
  freeRoom (id) {
    return _axios.put('/reception/remove-a-guest-and-free-the-room/' + id)
  },
}
