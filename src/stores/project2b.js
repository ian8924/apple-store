
import api from './api/project'

const state = {}

const actions = {
  async getVCESToken () {
    const res = await api.getVCESToken()
      .then(res => res.data)
      .catch(() => {})
    return res
  },
  async validateVCESStatus (context, data) {
    const res = await api.validateVCESStatus(data)
      .then(res => res.data)
      .catch(() => {})
    return res
  }
}

const project2bModule = function () {
  return { namespaced: true, state, actions }
}

export { project2bModule }
