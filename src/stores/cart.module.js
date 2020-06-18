import api from './api/orderservice'
import router from '../router'

const all = JSON.parse(sessionStorage.getItem('cart') || '[]')

export default {
  namespaced: true,
  state: {
    orderData: {}, // 起單資料
    all,
    totalPrice: 0,
    showModal: false,
    bonusRate: {},
    availablePoints: 0,
    discountPrice: 0,
    usedCard: {},
    swipeCard: '',
    recipientInfo: {},
    invoiceInfo: {},
    paymentInfo: {},
    historyOrder: [],
    showTransition: false,
    currentOrder: {},
    checkoutErrorMessage: ''
  },
  getters: {
    // 購物車清單
    listProductinCart (state) {
      return state.all
    },
    // 原價總金額
    totalPrice (state) {
      let total = 0
      state.all.forEach(item => {
        total += item.price
      })
      return total
    },
    // 使用點數資訊
    totalBonus (state) {
      const totalBonus = {}
      state.all.forEach(item => {
        if (Object.keys(totalBonus).includes(item.bonus.name)) {
          totalBonus[item.bonus.name] += item.bonus.points
        } else {
          totalBonus[item.bonus.name] = item.bonus.points
        }
      })
      return totalBonus
    },
    currentUsedCard (state) {
      return state.usedCard
    },
    currentSwipeCard (state) {
      return state.swipeCard
    },
    currentBonusRate (state) {
      return state.bonusRate
    },
    availablePoints (state) {
      return state.availablePoints
    },
    discountPrice (state) {
      return state.discountPrice
    },
    currentRecipientInfo (state) {
      return state.recipientInfo
    },
    currentInvoiceInfo (state) {
      return state.invoiceInfo
    },
    currentPaymentInfo (state) {
      return state.paymentInfo
    },
    currentHistoryOrder (state) {
      return state.historyOrder
    },
    currentOrder (state) {
      return state.currentOrder
    },
    showTransition (state) {
      return state.showTransition
    }
  },
  mutations: {
    // 考慮之後如果開放可購買多個產品時
    /* */
    setProducts (state, products) {
      products.quantity = 1
      products.installment = 1

      state.all = [products]
      sessionStorage.setItem('cart', JSON.stringify(state.all))
    },
    addProduct (state, product) {
      /*
      {
        summary: String 產品摘要
        img: url 產品圖
        price: Number 產品價格
        quantity: Number 數量
        bonus: Object 對點類型＆使用點數 {name, points}
        installment:  Number 分期
        selfPay: Number 自付金額
        engraving: Object 雷射雕刻 MSG
        usedCard: Object
      }
      */
      product.quantity = 1
      product.installment = 1
      state.all.push(product)
      sessionStorage.setItem('cart', JSON.stringify(state.all))
    },
    deleteProduct (state, cartIndex) {
      state.all = state.all.filter((item, index) => {
        return cartIndex !== index
      })
      sessionStorage.setItem('cart', JSON.stringify(state.all))
    },
    clearCart (state) {
      state.all = []
      sessionStorage.removeItem('cart')
    },
    clearProjectDiscount () {
      sessionStorage.removeItem('project')
    },
    // 編輯購物車商品付費資料
    editProduct (state, payload) {
      state.all[payload.index].selfPay = payload.price
      state.all[payload.index].bonus.points = payload.bonus
      state.all[payload.index].installment = payload.installment
      state.all[payload.index].payType = payload.payType

      sessionStorage.setItem('cart', JSON.stringify(state.all))
    },
    setBonusRate (state, newRate) {
      state.bonusRate = newRate
    },
    setAvailablePoints (state, availablePoints) {
      state.availablePoints = availablePoints
    },
    setDiscountPrice (state, discountPrice) {
      state.discountPrice = discountPrice
    },
    setusedCard (state, newCard) {
      state.usedCard = newCard
    },
    setSwipeCard (state, newCard) {
      state.swipeCard = newCard
    },
    setRecipientInfo (state, newRecipient) {
      /*
      {
        recipientName: "",
        recipientMobile: ""
        recipientAddress: {}
      }
      */
      state.recipientInfo = newRecipient
    },
    setInvoiceInfo (state, newInvoice) {
      /*
      {
        type: "電子發票"/"捐贈發票"/"三聯式發票"
        invoiceAddress: {},
        invoiceTitle: ""
        invoiceTaxID: ""
      }
      */
      state.invoiceInfo = newInvoice
    },
    setPaymentInfo (state, newPayment) {
      /*
      {
        cardExpire: "",
        securityCode: ""
      }
       */
      state.paymentInfo = newPayment
    },
    setHistoryOrder (state, Orders) {
      state.historyOrder = Orders
    },
    setCurrentOrder (state, newOrder) {
      state.currentOrder = newOrder
    },
    setCheckoutErrorMessage (state, errorMessage) {
      state.checkoutErrorMessage = errorMessage
    },
    setOrderData (state, newState) {
      state.orderData = newState
    }
  },
  actions: {
    async createOrder ({ state, commit, getters, rootState, dispatch }) {
      const orderData = state.orderData
      const userInfo = rootState.member.user
      const recipient = getters.currentRecipientInfo
      const invoice = getters.currentInvoiceInfo
      // const payment = getters.currentPaymentInfo;
      // if (Object.keys(recipient).length === 0 || Object.keys(invoice).length === 0 || Object.keys(payment).length === 0) {
      //   return false;
      // }
      // user Info
      orderData.UserUUID = userInfo.uuid

      // 收據信 email
      orderData.email = recipient.recipientEmail

      // receipt Info
      orderData.DeliverAddress = {
        City: recipient.recipientAddress.city,
        Area: recipient.recipientAddress.area,
        Address: recipient.recipientAddress.address
      }
      orderData.DeliverName = recipient.recipientName
      orderData.DeliverMobile = recipient.recipientMobile

      // invoice info
      orderData.SendReceiptType = invoice.type
      orderData.ReceiptTitle = invoice.invoiceTitle
      orderData.ReceiptID = invoice.invoiceTaxID
      orderData.ReceiptAddress = {
        City: invoice.invoiceAddress.city,
        Area: invoice.invoiceAddress.area,
        Address: invoice.invoiceAddress.address
      }
      commit('setCheckoutErrorMessage', '')
      commit('changeWaitServerResponse', true, { root: true })
      commit('setHistoryOrder', [])
      const result = await api
        .createOrder(orderData)
        .then(res => res.data)
        .catch(error => error.response)
        .finally(() => {})
      // 處理建立訂單失敗
      if (!result.orderID) {
        const errMsg = result.data.message || result.data
        var showErrMsg = ''
        if (errMsg === 'this is not VISA card') {
          showErrMsg = '本優惠需使用VISA信用卡'
        } else if (errMsg === "can't found card projectID") {
          showErrMsg = '信用卡卡號錯誤'
        } else if (errMsg.includes('discount error')) {
          showErrMsg = '折扣不符合資格'
        } else {
          showErrMsg = errMsg
        }
        // if (errMsg === 'User card no found') {
        //   dispatch('member/getBindMagicCard', null, { root: true })
        //   commit('setusedCard', {})
        //   commit('setBonusRate', {})
        //   commit('clearCart')
        // }
        commit('setCheckoutErrorMessage', showErrMsg)
        commit('changeWaitServerResponse', false, { root: true })
        return false
      }
      // 處理 token 失效
      if (result.status === 401) {
        dispatch('member/signout', null, { root: true })
      }
      commit('setCurrentOrder', result)
      commit('changeWaitServerResponse', false, { root: true })
      return true
    },
    checkoutOrder ({ state, commit, getters, dispatch }) {
      const postDatat = {
        cardUUID: getters.currentSwipeCard,
        serialID: getters.currentOrder.orderID,
        cardExpire: getters.currentPaymentInfo.cardExpire,
        CVV2: getters.currentPaymentInfo.securityCode
      }
      commit('setCheckoutErrorMessage', '')
      commit('changeWaitServerResponse', true, { root: true })
      return api
        .checkoutOrder(postDatat)
        .then(res => {
          state.showTransition = true
          // console.log('TCL: checkoutOrder -> res', res);
          router.push({ name: 'order complete' })
          commit('clearCart')
          commit('clearProjectDiscount')
          commit('setRecipientInfo', {})
          commit('setInvoiceInfo', {})
          commit('setPaymentInfo', {})
          commit('changeWaitServerResponse', false, { root: true })
        })
        .catch(error => {
          console.dir(error.response)
          if (error.response.status === 401) {
            dispatch('member/signout', null, { root: true })
          }
          // commit('setCheckoutErrorMessage', error.response.data.message)
          commit('setCheckoutErrorMessage', '請檢查信用卡資訊')
          state.showTransition = true
          commit('changeWaitServerResponse', false, { root: true })
          // 交易失敗也清空付款資訊
          commit('setPaymentInfo', {})
          // console.log('TCL: checkoutOrder -> res', error);
          router.push({ name: 'order failure' })
        })
    },
    async historyOrder ({ commit, rootState, dispatch }) {
      return api
        .historyOrder(rootState.member.user.uuid)
        .then(res => {
          commit('setHistoryOrder', res.data.reverse())
        })
        .catch(error => {
          if (error.response.status === 401) {
            dispatch('member/signout', null, { root: true })
          }
          // console.log("TCL: createOrder -> error", error.response.data);
        })
    }
  }
}
