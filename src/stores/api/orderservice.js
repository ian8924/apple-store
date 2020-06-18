import axios from 'axios'

import { API_URL, CREATE_ORDER, HISTORY_ORDER, CHECKOUT_ORDER } from './constant'

// import { encodeBase64 } from './secret';

export default {
  createOrder: orderData => {
    const url = `${API_URL}${CREATE_ORDER}`
    return axios.post(url, orderData, { withCredentials: true })
  },
  checkoutOrder: orderData => {
    const url = `${API_URL}${CHECKOUT_ORDER}`
    return axios.post(url, orderData, { withCredentials: true })
  },
  historyOrder: userUUID => {
    const url = `${API_URL}${HISTORY_ORDER}`
    return axios.post(url, { userUUID, customerType: 'VISA' }, { withCredentials: true })
  }
}
