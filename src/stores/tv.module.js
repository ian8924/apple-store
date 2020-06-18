import api from './api/productinfo'
import { chapterNavBar } from './config/config.tv'

// const RAW_PATH = process.env.VUE_APP_RAW;
// const raw = require(`../views/${RAW_PATH}`);

// const raw_tv = raw['Apple TV']['Apple TV'];
const TVModel = {
  model: '',
  capacity: '',
  points: 0,
  pic: ''
}

const choicesTV = {
  model: [],
  capacity: []
}

const textSummry = ''
const mapImg = {}
const mapPrice = {}
const mapPartNumber = {}
const mapInstallment = {}
const mapEngraving = {}
const hero = ''

const state = {
  chapterNavBar,
  TVModel,
  choicesTV,
  mapImg,
  mapPrice,
  mapPartNumber,
  mapInstallment,
  mapEngraving,
  hero,
  textSummry
}
const getters = {
  // 產品目前選擇容量
  currentCapacity: state => {
    return state.TVModel.capacity
  },
  // 產品目前選擇機型
  currentModel: state => {
    return state.TVModel.model
  },
  // 產品目前顯示圖片
  currentPic: (state, getters) => {
    // map current pic
    return state.mapImg[`${getters.currentModel}`]
  },
  // 產品目前 PartNumbrt
  currentPartNumber: (state, getters) => {
    return state.mapPartNumber[`${getters.currentModel}${getters.currentCapacity}`]
  },
  currentInstallment: (state, getters) => {
    return state.mapInstallment[getters.currentPartNumber] || 1
  },
  currentEngraving: (state, getters) => {
    const isEngravable = Boolean(state.mapEngraving[getters.currentPartNumber] || 0)
    return isEngravable ? { msg1: '', msg2: '' } : false
  },
  currentHero: state => {
    return state.hero
  },
  // 產品目前選擇摘要
  selectionSummary: (state, getters) => {
    if (!getters.selectionCompleted) {
      return ''
    }
    return state.TVModel
  },
  // 判斷目前產品選擇是否完成，讓需要選擇完成選項才出現的 DOM 才出現
  selectionCompleted: state => {
    if (Object.keys(state.TVModel).length === 0) {
      return false
    }
    for (const key in state.TVModel) {
      if (key === 'pic') {
        continue
      }
      if (!(state.TVModel[key] || false)) {
        return false
      }
    }
    return true
  },
  // 產品目前選擇項目需要花費的點數
  costPoints: (state, getters) => {
    if (Object.keys(state.mapPrice).length === 0) {
      return 0
    }
    if (!Object.prototype.hasOwnProperty.call(state.mapPrice, `${getters.currentModel}${getters.currentCapacity}`)) {
      return 0
    }
    state.TVModel.points = state.mapPrice[`${getters.currentModel}${getters.currentCapacity}`].price
    return state.TVModel.points
  },
  // 由 API 從後端拿到的產品選項
  availableChoices: state => {
    return state.choicesTV
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
    state.TVModel[option.type] = option.val
  },
  setCurrenTVModel (state, defaultModel) {
    state.TVModel = defaultModel
  },
  initTVModel (state, option) {
    state.choicesTV = option
  },
  initImgMap (state, option) {
    state.mapImg = option
  },
  initPriceMap (state, option) {
    state.mapPrice = option
  },
  initPartNumberMap (state, option) {
    state.mapPartNumber = option
  },
  initEngravingMap (state, option) {
    state.mapEngraving = option
  },
  initInstallmentMap (state, option) {
    state.mapInstallment = option
  },
  setCurrentHero (state, hero) {
    for (const iterator of state.chapterNavBar) {
      const heroName = iterator.prodName + (iterator.subName || '')
      if (heroName.toLowerCase().replace(/\s/g, '-') === hero) {
        state.hero = heroName
        return
      }
    }
  },
  resetState (state) {
    // 頁面移除時，清除 state
    state.TVModel = TVModel
    state.choicesTV = choicesTV
    state.mapImg = mapImg
    state.mapPrice = mapPrice
    state.hero = hero
  },
  setTextSummary (state, Text) {
    state.textSummry = Text
  }
}
const actions = {
  getTVInfo (context, hero) {
    context.commit('setCurrentHero', hero.model)
    context.commit('changeWaitServerResponse', true, { root: true })
    api
      .getProductList(hero.model.replace(/-/g, '_'), 'VISA')
      .then(({ data }) => {
        // for (const item of raw_tv) {
        //   if (
        //     item.name
        //       .toLowerCase()
        //       .replace(/\s/g, '-')
        //       .includes(hero.model)
        //   ) {
        //     data.push(item);
        //   }
        // }

        if (data.length === 0) {
          context.commit('resetState')
          return
        }
        data = data.sort((a, b) => {
          return a.price - b.price
        })
        const model = []
        const capacity = []
        const mapImg = {}
        const mapPrice = {}
        const mapPartNumber = {}
        const mapInstallment = {}
        const mapEngraving = {}
        context.commit('setCurrenTVModel', {
          model: data[0].model,
          capacity: data[0].capacity,
          points: data[0].price
        })
        data.forEach(objPart => {
          // get product family choices
          if (!model.includes(objPart.model)) {
            model.push(objPart.model)
          }
          if (!capacity.includes(objPart.capacity)) {
            capacity.push(objPart.capacity)
          }
          // 用來對應價格的 Object
          mapPrice[`${objPart.model}${objPart.capacity}`] = {
            price: objPart.price,
            bounsPoint: objPart.bounsPoint
          }
          // 用來對應產品圖片的 Object
          mapImg[`${objPart.model}`] = objPart.IMGLink
          mapPartNumber[`${objPart.model}${objPart.capacity}`] = objPart.specName
          mapEngraving[objPart.specName] = objPart.engraving
          mapInstallment[objPart.specName] = objPart.installment
        })

        context.commit('initTVModel', {
          model,
          capacity
        })
        context.commit('initPriceMap', mapPrice)
        context.commit('initImgMap', mapImg)
        context.commit('initPartNumberMap', mapPartNumber)
        context.commit('initInstallmentMap', mapInstallment)
        context.commit('initEngravingMap', mapEngraving)
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
