import axios from 'axios'
import { API_URL, PRODUCT_DETAIL, ENGRAVING } from './constant'

export default {
  getProductList: (hero, customerType, filter = '') => {
    const url = `${API_URL}${PRODUCT_DETAIL}`
    return axios
      .post(url, {
        category: hero,
        customerType: customerType,
        filter
      })
      .catch((error) => {
        console.log(error)
        return { data: [] }
      })
  },
  getEngravingImg: (partNumber, msg1, msg2, hasLine2) => {
    const query = hasLine2 ? `th=${msg1}&tl=${msg2}&s=2` : `th=${msg1}&s=1`
    return `${ENGRAVING}/${partNumber}?${query}`
  },
  logout: () => {}
}
