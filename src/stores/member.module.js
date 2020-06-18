import router from '../router'
import service from './api/userservice'
import * as moment from 'moment'

const user = JSON.parse(sessionStorage.getItem('user'))

const initStatus = {}
const initUser = user || {}

const mutations = {
  loginRequest (state, user) {
    state.status = { loggingIn: true }
    state.user = user
  },
  loginSuccess (state) {
    state.status = { loggedIn: true }
  },
  loginFailure (state) {
    state.status = { isLogFailed: true }
    state.user = null
  },
  logout (state) {
    state.status = {}
    state.user = {}
  },
  setSignupFailure (state) {
    state.status = { isSignupFailed: true }
  },
  setUserUUID (state, uuid) {
    state.user.uuid = uuid
  },
  setUserInfo (state, info) {
    info.BirthDay = moment(info.BirthDay).format('YYYY-MM-DD')
    state.user.info = info
    state.user = Object.assign({}, state.user)
  },
  setUserCardInfo (state, info) {
    state.user.infoCard = info
    state.user = Object.assign({}, state.user)
  },

  resetLogFailed (state) {
    state.status.isLogFailed = false
  },
  setRegistryAccount (state, mobile) {
    state.curRegistryAccount = mobile
  }
}
const getters = {
  isLoggedIn (state) {
    return state.status.loggedIn || false
  },
  isLogging (state) {
    return state.status.loggingIn || false
  },
  isLogFailed (state) {
    return state.status.isLogFailed || false
  },
  isSignupFailed (state) {
    return state.status.isSignupFailed || false
  },
  isResetPwd (state) {
    return state.isResetPwd
  },
  user (state) {
    return state.user.info
  },
  card (state) {
    return state.user.infoCard
  },
  curRegistryAccount (state) {
    return state.curRegistryAccount
  },
  uuid (state) {
    return state.user.uuid
  }
}
const actions = {
  // 登入帳號
  async signin ({ commit, dispatch, rootGetters }, { account, pwd, jumpRoute }) {
    // 修改 status LoggedIn = true
    let customerType = rootGetters['product/currentCustomerType']
    const tempData = location.href.split('/')
    if (tempData[5] !== undefined) {
      customerType = tempData[4]
    }
    commit('loginRequest', { account })
    const uuid = await service
      .signin({ account, pwd, customerType })
      .then(res => res.data)
      .then(data => data.userUUID)
      .catch(error => error.response.status)
    if (uuid >= 400) {
      commit('loginFailure')
      return uuid
    }
    commit('setUserUUID', uuid)
    sessionStorage.setItem('user', JSON.stringify({ uuid }))
    await dispatch('getUserInfo')
    await dispatch('getBindMagicCard')
    commit('loginSuccess')
    const query = router.currentRoute.query
    if (query.from && query.hero) {
      router.push({ name: query.from, params: { hero: query.hero } })
    } else {
      router.push({ name: jumpRoute })
    }
    return uuid
  },
  async checkSignin ({ state, commit, dispatch }) {
    const isSignin = await service
      .checkSingin()
      .then(res => res.data)
      .then(data => data.msg)
      .then(msg => msg === 'token accpet')
      .catch(() => false)
    if (isSignin) {
      if (!state.user.uuid) {
        await dispatch('getUserUUID')
      }
      commit('loginSuccess')
    }
    return isSignin
  },
  async getUserUUID ({ commit }) {
    const uuid = await service
      .getUserUUID()
      .then(res => res.data)
      .then(data => data['User UUID'])
      .catch(() => '')
    commit('setUserUUID', uuid)
    sessionStorage.setItem('user', JSON.stringify({ uuid }))
  },
  // 註冊帳號
  async signup ({ commit, rootGetters }, { postInfo }) {
    const tempData = location.href.split('/')
    if (tempData[6] !== undefined) {
      postInfo.customerType = tempData[4]
    }
    commit('changeWaitServerResponse', true, { root: true })
    await service
      .signup(postInfo)
      .then(res => res.data)
      .then(() => {
        router.push({ name: 'signin', query: { isRegistry: true } })
      })
      .catch(() => {
        commit('setSignupFailure')
      })
    commit('changeWaitServerResponse', false, { root: true })
  },
  // 會員進行綁卡
  // 綁卡規則 DB 欄位 IM_CardBonus.ProjectNameCheckCode && IM_CardBonus.ProjectName
  bindMagicCard ({ state, dispatch }, payload) {
    payload.userUUID = state.user.uuid
    return new Promise((resolve, reject) => {
      service.bindMagicCard(payload).then(
        res => {
          dispatch('getBindMagicCard').then(() => resolve())
        },
        error => {
          if (error.response.status === 401) {
            dispatch('signout')
          } else {
            reject(error)
          }
        }
      )
    })
  },
  // 移除綁卡
  removeMagicCard ({ dispatch }, cardUUID) {
    return new Promise((resolve, reject) => {
      service.removeMagicCard(cardUUID).then(
        res => {
          dispatch('getBindMagicCard')
          resolve(res)
        },
        error => {
          if (error.response.status === 401) {
            dispatch('signout')
          } else {
            reject(error)
          }
        }
      )
    })
  },
  // 取得會員資料
  getUserInfo ({ state, commit, dispatch }) {
    return new Promise((resolve, reject) => {
      service.getUserInfo(state.user.uuid).then(
        res => {
          resolve(res)
          commit('setUserInfo', res.data)
        },
        error => {
          if (error.response.status === 401) {
            dispatch('signout')
          } else {
            reject(error)
          }
        }
      )
    })
  },
  // 取得會員綁卡資料
  getBindMagicCard ({ state, commit, dispatch }) {
    return new Promise((resolve, reject) => {
      service.getMagicCard(state.user.uuid).then(
        res => {
          commit('setUserCardInfo', res.data)
          resolve(res)
        },
        error => {
          if (error.response.status === 401) {
            dispatch('signout')
          } else {
            reject(error)
          }
        }
      )
    })
  },
  queryMagicCardBonus ({ dispatch }, cardUUID) {
    return new Promise((resolve, reject) => {
      service.queryBonus(cardUUID).then(
        res => {
          resolve(res)
        },
        error => {
          if (error.response.status === 401) {
            dispatch('signout')
          } else {
            reject(error)
          }
        }
      )
    })
  },
  // 登出帳號
  async signout ({ commit }) {
    let isSignout = false
    while (!isSignout) {
      isSignout = await service
        .signout()
        .then(res => res.data)
        .then(data => data.msg)
        .then(msg => msg === 'user cookie token has be clear' || msg === 'user originally not have cookie token')
        .catch(() => false)
    }
    sessionStorage.removeItem('user')
    commit('logout')
    commit('cart/clearCart', null, { root: true })
    commit('cart/setRecipientInfo', {}, { root: true })
    commit('cart/setInvoiceInfo', {}, { root: true })
    commit('cart/setPaymentInfo', {}, { root: true })
    commit('cart/setHistoryOrder', [], { root: true })
    commit('cart/setPaymentInfo', {}, { root: true })
    commit('cart/setusedCard', {}, { root: true })
    commit('cart/setBonusRate', {}, { root: true })
    commit('cart/setAvailablePoints', 0, { root: true })
    router.push({ name: 'signin' })
  },
  // 重設密碼
  resetPassword ({ state, dispatch, commit, rootGetters }, { oldPassword, newPassword }) {
    let customerType = rootGetters['product/currentCustomerType']
    const tempData = location.href.split('/')
    if (tempData[6] !== undefined) {
      customerType = tempData[4]
    }
    return new Promise((resolve, reject) => {
      service
        .resetPassword({ mobile: state.user.info.Mobile, oldPassword, newPassword, customerType })
        .then(res => {
          state.isResetPwd = true
          dispatch('signout')
          commit('cart/deleteProduct', 0)
          resolve(res)
        })
        .catch(error => {
          state.isResetPwd = true
          if (error.response.status === 401) {
            dispatch('signout')
          } else {
            reject(error)
          }
        })
    })
  },
  // 忘記密碼重設
  resetPasswordForgetPWD ({ state, rootGetters }, { newPassword, passCode }) {
    let customerType = rootGetters['product/currentCustomerType']
    const tempData = location.href.split('/')
    if (tempData[6] !== undefined) {
      customerType = tempData[4]
    }
    return new Promise((resolve, reject) => {
      service
        .resetPasswordForgetPWD({ mobile: state.curRegistryAccount, newPassword, passCode, customerType })
        .then(res => {
          state.isResetPwd = true
          resolve(res)
        })
        .catch(error => {
          state.isResetPwd = true
          reject(error)
        })
    })
  },
  // 發送 SMS 驗證手機號碼
  verifyMobile ({ rootGetters }, mobileNumber) {
    let customerType = rootGetters['product/currentCustomerType']
    const tempData = location.href.split('/')
    if (tempData[6] !== undefined) {
      customerType = tempData[4]
    }
    return new Promise((resolve, reject) => {
      service.verifyMobile(mobileNumber, customerType).then(
        res => {
          resolve(res)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  // 發送 SMS 驗證忘記密碼
  sendVerifySMSForgetPWD ({ rootGetters }, mobileNumber) {
    let customerType = rootGetters['product/currentCustomerType']
    const tempData = location.href.split('/')
    if (tempData[6] !== undefined) {
      customerType = tempData[4]
    }
    return new Promise((resolve, reject) => {
      service.sendVerifySMSForgetPWD(mobileNumber, customerType).then(
        res => {
          resolve(res)
        },
        error => {
          const errMsg = error.response.data.message.toLowerCase()
          switch (errMsg) {
            case 'validate user error user already active':
              resolve(error.response)
              break
            default:
              reject(error)
          }
        }
      )
    })
  },
  // 驗證忘記密碼
  checkVerifyCodeForgetPWD ({ rootGetters }, { mobileNumber, verifyCode }) {
    let customerType = rootGetters['product/currentCustomerType']
    const tempData = location.href.split('/')
    if (tempData[6] !== undefined) {
      customerType = tempData[4]
    }
    return new Promise((resolve, reject) => {
      service.verifyMobileForgetPWD(mobileNumber, verifyCode, customerType).then(
        res => {
          resolve(res)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  // 驗證手機號碼
  checkVerifyCode ({ commit, rootGetters }, { mobileNumber, verifyCode }) {
    let customerType = rootGetters['product/currentCustomerType']
    const tempData = location.href.split('/')
    if (tempData[6] !== undefined) {
      customerType = tempData[4]
    }
    return new Promise((resolve, reject) => {
      service.verifyMobile(mobileNumber, customerType, verifyCode).then(
        res => {
          commit('setRegistryAccount', mobileNumber)
          resolve(res)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  // 編輯使用者資料
  editUserInfo ({ state, dispatch, rootGetters }, postInfo) {
    for (const key in postInfo) {
      state.user.info[key] = postInfo[key]
    }
    postInfo.uuid = state.user.uuid
    postInfo.customerType = rootGetters['product/currentCustomerType']
    return new Promise((resolve, reject) => {
      service.editUserInfo(postInfo).then(
        res => {
          resolve(res)
        },
        error => {
          if (error.response.status === 401) {
            dispatch('signout')
          } else {
            reject(error)
          }
        }
      )
    })
  }
}

const state = { status: initStatus, user: initUser, info: {}, curRegistryAccount: '', isResetPwd: false }
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
