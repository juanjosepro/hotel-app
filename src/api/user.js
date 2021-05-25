import { _axios } from '@/plugins/axios'

export default {
  getAllUsers (status) {
    return _axios.get('users/' + status)
  },
  createUser (user) {
    return _axios.post('users', user)
  },
  getUserByDni (dni) {
    return _axios.get('users/show/' + dni)
  },
  updateUser (id, user) {
    //by the FormData
    return _axios.post('users/' + id, user)
  },
  disableUser (id) {
    return _axios.delete('users/' + id)
  },
}
