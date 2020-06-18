import api from './api/productinfo'
import { chapterNavBar } from './config/config.mac'

// const RAW_PATH = process.env.VUE_APP_RAW;
// const raw = require(`../views/${RAW_PATH}`);

// const raw_mac = raw.Mac;

const choicesMac = { model: [], screenSize: [], finish: [], capacity: [], groupMac: [] }

const hero = ''
const macModel = {}
const textSummry = ''
const state = {
  chapterNavBar,
  choicesMac,
  macModel,
  hero,
  textSummry
}
const getters = {
  currentHero: state => {
    return state.hero
  },
  currentPic: state => {
    // map current pic
    return state.macModel.IMGLink || ''
  },
  currentPartNumber: state => {
    return state.macModel.specName
  },
  currentInstallment: state => {
    return state.macModel.installment || 1
  },
  currentEngraving: state => {
    const isEngravable = Boolean(state.macModel.engraving || 0)
    return isEngravable ? { msg1: '', msg2: '' } : false
  },
  // 產品目前選擇項目需要花費的點數
  costPoints: state => {
    return state.macModel.price || 0
  },
  selectionCompleted: () => {
    return true
  },
  availableChoices: state => {
    return state.choicesMac
  },
  add2CartInfo: (state, getters) => {
    return {
      summary: state.textSummry,
      price: getters.costPoints,
      img: getters.currentPic,
      partNumber: getters.currentPartNumber,
      maxInstallment: getters.currentInstallment,
      engraving: getters.currentEngraving
    }
  }
}
const mutations = {
  selectModel (state, option) {
    state.macModel = option
  },
  initMacModel (state, option) {
    state.choicesMac = option
  },
  setCurrentHero (state, hero) {
    for (const iterator of state.chapterNavBar) {
      const heroName = iterator.prodName
      if (heroName.toLowerCase().replace(/\s/g, '-') === hero) {
        state.hero = heroName
        return
      }
    }
  },
  resetState (state) {
    // 頁面移除時，清除 state
    state.macModel = {}
    state.choicesMac = choicesMac
    state.hero = hero
  },
  setTextSummary (state, Text) {
    state.textSummry = Text
  }
}
const actions = {
  getMacInfo (context, hero) {
    context.commit('resetState')
    context.commit('setCurrentHero', hero.model)
    context.commit('changeWaitServerResponse', true, { root: true })

    api
      .getProductList(hero.model.replace(/-/g, '_'), 'VISA')
      .then(({ data }) => {
        if (data.length === 0) {
          context.commit('resetState')
          return
        }
        data = data.sort((a, b) => {
          const colorA = a.color
          const colorB = b.color
          return colorA < colorB ? 1 : colorA > colorB ? -1 : 0
        })
        data = data.sort((a, b) => {
          return a.price - b.price
        })
        const groupMac = {}
        const model = []
        const capacity = []
        const screenSize = []
        const finish = []

        data.forEach((objPart) => {
          // get product family choices
          if (!model.includes(objPart.model)) {
            model.push(objPart.model)
          }
          if (!screenSize.includes(parseFloat(objPart.productSize))) {
            screenSize.push(parseFloat(objPart.productSize))
          }
          if (!capacity.includes(objPart.capacity)) {
            capacity.push(objPart.capacity)
          }
          if (!finish.includes(objPart.color)) {
            finish.push(objPart.color)
          }
          if (!groupMac[objPart.price]) {
            groupMac[objPart.price] = []
          }
          objPart.modelspecs = objPart.modelspecs.split(',')
          groupMac[objPart.price].push(objPart)
        })

        context.commit('initMacModel', {
          model,
          screenSize,
          capacity,
          finish,
          groupMac
        })
      })
      .finally(() => {
        context.commit('changeWaitServerResponse', false, { root: true })
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
