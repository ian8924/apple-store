import axios from 'axios'
import { API_URL, MOBILE_VERIFY, USER_SIGNUP, USER_SIGNIN, USER_EDIT_INFO, BIND_MAGIC_CARD, MAGIC_CARD_LIST, USER_INFO, QUERY_BONUS, REMOVE_CARD, USER_RESET_PWD, USER_FORGET_PWD, USER_FORGET_PWD_SMS, API_RECAPTCHA, USER_RECAPTCHA, API_CAPTCHA, USER_CAPTCHA, USER_CAPTCHA_IMG, USER_CAPTCHA_CONFIRM, USER_CHECK_SIGN_IN, USER_SIGN_OUT, USER_UUID } from './constant'

import { encodeBase64 } from './secret'

encodeBase64('123')

export default {
  signin: ({ account, pwd, customerType }) => {
    // AES 加密
    // https://github.com/brix/crypto-js/issues/189
    // const encodePwd = Base64.stringify(Utf8.parse(pwd));
    const encodePwd = encodeBase64(pwd)
    const url = `${API_URL}${USER_SIGNIN}`
    return axios.post(url, { mobile: account, password: encodePwd, customerType: customerType }, { withCredentials: true })
  },
  checkSingin: () => {
    const url = `${API_URL}${USER_CHECK_SIGN_IN}`
    return axios.get(url, { withCredentials: true })
  },
  getUserUUID: () => {
    const url = `${API_URL}${USER_UUID}`
    return axios.get(url, { withCredentials: true })
  },
  signout: () => {
    const url = `${API_URL}${USER_SIGN_OUT}`
    return axios.get(url, { withCredentials: true })
  },
  editUserInfo: (userInfo) => {
    const url = `${API_URL}${USER_EDIT_INFO}`
    return axios.post(url, userInfo, { withCredentials: true })
  },
  verifyRECAPTCHA: (token) => {
    const url = `${API_RECAPTCHA}${USER_RECAPTCHA}?recaptchaResponse=${token}`
    return axios.get(url)
  },
  getCAPTCHA: () => {
    const url = `${API_CAPTCHA}${USER_CAPTCHA}`
    return axios.get(url)
  },
  getCAPTCHAImg: (captchaID) => {
    return `${API_CAPTCHA}${USER_CAPTCHA_IMG}${captchaID}.png`
  },
  verifyCAPTCHA: (captchaID, captchaSolution) => {
    const url = `${API_CAPTCHA}${USER_CAPTCHA_CONFIRM}`
    return axios.post(url, { captchaID, captchaSolution })
  },
  resetPassword: ({ mobile, oldPassword, newPassword, customerType }) => {
    const encodeOldPassword = encodeBase64(oldPassword)
    const encodeNewPassword = encodeBase64(newPassword)
    const url = `${API_URL}${USER_RESET_PWD}`
    return axios.post(url, { mobile: mobile, oldPassword: encodeOldPassword, newPassword: encodeNewPassword, customerType: customerType }, { withCredentials: true })
  },
  resetPasswordForgetPWD: ({ mobile, newPassword, passCode, customerType }) => {
    const encodeNewPassword = encodeBase64(newPassword)
    const url = `${API_URL}${USER_RESET_PWD}`
    return axios.post(url, { mobile: mobile, newPassword: encodeNewPassword, passCode: passCode, customerType: customerType }, { withCredentials: true })
  },
  signup: (userinfo) => {
    userinfo.Password = encodeBase64(userinfo.Password)
    const url = `${API_URL}${USER_SIGNUP}`
    return axios.post(url, userinfo)
  },
  sendVerifySMSForgetPWD: (mobileNumber, customerType) => {
    const url = `${API_URL}${USER_FORGET_PWD_SMS}`
    return axios.post(url, { mobile: mobileNumber, customerType: customerType })
  },
  verifyMobile: (mobileNumber, customerType, verifyCode = '') => {
    const url = `${API_URL}${MOBILE_VERIFY}`
    return axios.post(url, { mobile: mobileNumber, validateCode: verifyCode, customerType: customerType })
  },
  verifyMobileForgetPWD: (mobileNumber, verifyCode, customerType) => {
    const url = `${API_URL}${USER_FORGET_PWD}`
    return axios.post(url, { mobile: mobileNumber, passCode: verifyCode, customerType: customerType }, { withCredentials: true })
  },
  getUserInfo: (uuid) => {
    const url = `${API_URL}${USER_INFO}`
    return axios.post(url, { uuid: uuid }, { withCredentials: true })
  },
  bindMagicCard: (magiccard) => {
    const url = `${API_URL}${BIND_MAGIC_CARD}`
    return axios.post(url, magiccard, { withCredentials: true })
  },
  getMagicCard: (uuid) => {
    const url = `${API_URL}${MAGIC_CARD_LIST}`
    return axios.post(url, { userUUID: uuid }, { withCredentials: true })
  },
  queryBonus: (cardUUID) => {
    const url = `${API_URL}${QUERY_BONUS}`
    return axios.post(url, { cardUUID }, { withCredentials: true })
  },
  removeMagicCard: (cardUUID) => {
    const url = `${API_URL}${REMOVE_CARD}`
    return axios.post(url, { cardUUID }, { withCredentials: true })
  }
}
