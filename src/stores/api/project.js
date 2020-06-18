import axios from 'axios'

import { API_URL, VISA_VCES_IFRAME, VISA_VCES_STATUS } from './constant'

export default {

  getVCESToken () {
    const url = `${API_URL}${VISA_VCES_IFRAME}`
    return axios.get(url)
  },
  validateVCESStatus (data) {
    const url = `${API_URL}${VISA_VCES_STATUS}`
    return axios.post(url, data)
  }
}
