const state = { currentProductList: '', customerType: '' }
const getters = {
  currentProductList: state => {
    return state.currentProductList
  },
  currentCustomerType: state => {
    return state.customerType
  }
}
const mutations = {
  setCurrentProductList: (state, productLineName) => {
    state.currentProductList = productLineName
  },
  setCustomerType (state, val) {
    state.customerType = val
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
