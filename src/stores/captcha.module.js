import service from './api/userservice'
export default function () {
  return {
    namespaced: true,
    state: {
      captchaID: '',
      captchaSolution: ''
    },
    getters: {
      captchaImg (state) {
        return state.captchaID !== '' ? service.getCAPTCHAImg(state.captchaID) : ''
      }
    },
    mutations: {
      SET_CAPTCHAID (state, value) {
        state.captchaID = value
      },
      SET_CAPTCHA_SOLUTION (state, value) {
        state.captchaSolution = value
      }
    },
    actions: {
      async GET_CAPTCHA ({ commit }) {
        const result = await service.getCAPTCHA()
          .then(res => res.data)
          .then(data => data.captchaID)
          .catch(() => '')
        commit('SET_CAPTCHAID', result)
        return result
      },
      async VERIFY_CAPTCHA ({ state }) {
        const { captchaID, captchaSolution } = state
        if (captchaID === '' || captchaSolution === '') return
        const result = await service.verifyCAPTCHA(captchaID, captchaSolution)
          .then(res => res.data)
          .then(data => data.message)
          .catch(() => 'Error')
        if (result === 'Success!') {
          return true
        }
        return false
      }
    }
  }
}
