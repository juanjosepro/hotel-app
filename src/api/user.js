import { _axios } from '@/plugins/axios'

export default {
  createUser (user) {
    return _axios.post('users', user)
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
