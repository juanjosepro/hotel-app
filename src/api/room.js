import { _axios } from '@/plugins/axios'

export default {
  getAllRooms (status) {
    return _axios.get('rooms/' + status)
  },
  createRoom (room) {
    return _axios.post('rooms', room)
  },
  getRoomByNumber (number) {
    return _axios.get('rooms/show/' + number)
  },
  updateRoom (number, room) {
    return _axios.put('rooms/' + number, room)
  },
}
