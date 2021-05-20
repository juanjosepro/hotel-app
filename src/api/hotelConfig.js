import { _axios } from '@/plugins/axios'

export default {
  getHotel () {
    return _axios.get('hotel')
  },
  updateHotel (id, setting) {
    //al mandar con put genera un error el formData con imagenes!
    return _axios.post('hotel/' + id, setting)
  },
}
