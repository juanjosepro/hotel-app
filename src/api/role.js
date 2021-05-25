import { _axios } from '@/plugins/axios'

export default {
  getAllRoles () {
    return _axios.get('roles')
  },
  createRole (role) {
    return _axios.post('roles', role)
  },
  updateRole (id, role) {
    return _axios.put('roles/' + id, role)
  },
}
