import { _axios } from '@/plugins/axios'

export default {
  getAllBoxes () {
    return _axios.get('box')
  },
  getDailyCheck () {
    return _axios.get('box/daily-check')
  },
  getCashDetailsByDate (date) {
    return _axios.get('box/cash-details-by-date/' + date)
  },
}
