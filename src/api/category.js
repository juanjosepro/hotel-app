import { _axios } from '@/plugins/axios'

export default {
  getAllCategories () {
    return _axios.get('categories')
  },
  createCategory (category) {
    return _axios.post('categories', category)
  },
  getAllRoomsByCategory (name) {
    return _axios.get('categories/get-all-rooms-by-category/' + name)
  },
  getCategoryByName (name) {
    return _axios.get('categories/' + name)
  },
  updateCategory (id, category) {
    return _axios.post('categories/' + id, category)
  },
}
