import { _axios } from '@/plugins/axios'

export default {
  createRole (role) {
    return _axios.post('roles', role)
  },
  getAllRoles () {
    return _axios.get('roles')
  },
  updateRole (id, role) {
    return _axios.put('roles/' + id, role)
  },
}
