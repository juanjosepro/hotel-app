import { _axios } from '@/plugins/axios'

export default {
  createUser () {
    return _axios.post('users')
  },
  getAllUsers (status) {
    return _axios.get('users/' + status)
  },
  getUserById (dni) {
    return _axios.get('users/' + dni)
  },
  updateUser (id, user) {
    //by the FormData
    return _axios.post('users/' + id, user)
  },
  disableUser (id) {
    return _axios.delete('users/' + id)
  },
}
