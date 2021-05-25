import { _axios } from '@/plugins/axios'

export default {
  getAllReceptionRooms () {
    return _axios.get('reception')
  },
  registeNewGuest (guest) {
    return _axios.post('reception/', guest)
  },
  //more information about the guest
  moreInformationAboutTheGuest (number) {
    return _axios.get('reception/' + number)
  },
  updateGuest (id, guest) {
    return _axios.put('reception/' + id, guest)
  },
  //remove a guest and free the room
  freeRoom (id) {
    return _axios.delete('/reception/' + id)
  },
}
