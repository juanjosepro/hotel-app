import { _axios } from '@/plugins/axios'

export default {
  createCategory (category) {
    return _axios.post('categories', category)
  },
  getAllCategories () {
    return _axios.get('categories')
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
