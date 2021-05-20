import { _axios } from '@/plugins/axios'

export default {
  createRoom (room) {
    return _axios.post('rooms', room)
  },
  getAllRooms (status) {
    return _axios.get('rooms/' + status)
  },
  getRoomByNumber (number) {
    return _axios.get('rooms/' + number)
  },
  updateRoom (id, room) {
    return _axios.put('rooms/' + id, room)
  },
  disabledRoom (id) {
    return _axios.delete('rooms/' + id)
  },
}
