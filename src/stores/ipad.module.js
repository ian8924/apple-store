import api from './api/productinfo'
import { chapterNavBar } from './config/config.ipad'

// const RAW_PATH = process.env.VUE_APP_RAW;
// const raw = require(`../views/${RAW_PATH}`);
// const raw_ipad = raw['iPad'];

const ipadModel = {
  finish: '',
  model: '',
  capacity: '',
  connectivity: '',
  points: 0,
  pic: ''
}

const choicesiPad = {
  model: [],
  finish: [],
  capacity: [],
  connectivity: []
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
  ipadModel,
  choicesiPad,
  mapImg,
  mapPrice,
  mapPartNumber,
  mapInstallment,
  mapEngraving,
  hero,
  textSummry
}

const getters = {
  // 產品目前選擇外觀
  currentFinish: state => {
    return state.ipadModel.finish
  },
  // 產品目前選擇容量
  currentCapacity: state => {
    return state.ipadModel.capacity
  },
  // 產品目前選擇機型
  currentModel: state => {
    return state.ipadModel.model
  },
  // 產品目前選擇網路連線能力
  currentConnectivity: state => {
    return state.ipadModel.connectivity
  },
  // 產品目前顯示圖片
  currentPic: (state, getters) => {
    // map current pic
    return state.mapImg[`${getters.currentModel}${getters.currentFinish}`]
  },
  // 產品目前 PartNumbrt
  currentPartNumber: (state, getters) => {
    return state.mapPartNumber[`${getters.currentModel}${getters.currentFinish}${getters.currentCapacity}${getters.currentConnectivity}`]
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
    return state.ipadModel
  },
  // 判斷目前產品選擇是否完成，讓需要選擇完成選項才出現的 DOM 才出現
  selectionCompleted: state => {
    if (Object.keys(state.ipadModel).length === 0) {
      return false
    }
    for (const key in state.ipadModel) {
      if (key === 'pic' || (state.hero !== 'iPad Pro' && key === 'model')) {
        continue
      }
      if (!(state.ipadModel[key] || false)) {
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
    if (!Object.prototype.hasOwnProperty.call(state.mapPrice, `${getters.currentModel}${getters.currentCapacity}${getters.currentConnectivity}`)) {
      return 0
    }
    state.ipadModel.points = state.mapPrice[`${getters.currentModel}${getters.currentCapacity}${getters.currentConnectivity}`].price
    return state.ipadModel.points
  },
  // 由 API 從後端拿到的產品選項
  availableChoices: state => {
    return state.choicesiPad
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
    state.ipadModel[option.type] = option.val
  },
  setCurreniPadModel (state, defaultModel) {
    state.ipadModel = defaultModel
  },
  initiPadModel (state, option) {
    state.choicesiPad = option
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
      if (heroName.toLowerCase().replace(' ', '-') === hero) {
        state.hero = iterator.prodName + (iterator.subName || '')
        return
      }
    }
  },
  resetState (state) {
    // 頁面移除時，清除 state
    state.ipadModel = ipadModel
    state.choicesiPad = choicesiPad
    state.mapImg = mapImg
    state.mapPrice = mapPrice
    state.hero = hero
  },
  setTextSummary (state, Text) {
    state.textSummry = Text
  }
}
const actions = {
  getiPadInfo (context, hero) {
    context.commit('setCurrentHero', hero.model)
    context.commit('changeWaitServerResponse', true, { root: true })
    api
      .getProductList(hero.model.replace(/-/g, '_'), 'VISA')
      .then(({ data }) => {
        data = data.sort((a, b) => {
          return a.price - b.price
        })
        switch (hero.model) {
          case 'ipad':
            data = data.filter(el => el.model === context.getters.currentHero)
            break
          default:
            data = data.filter(el => el.model.includes(context.getters.currentHero))
            break
        }
        if (data.length === 0) {
          context.commit('resetState')
          return
        }
        const model = []
        const finish = []
        const capacity = []
        const connectivity = []
        const mapImg = {}
        const mapPrice = {}
        const mapPartNumber = {}
        const mapInstallment = {}
        const mapEngraving = {}

        context.commit('setCurreniPadModel', {
          finish: data[0].color.toLowerCase().replace(' ', '-'),
          model: data[0].productSize.replace('-inch', ''),
          capacity: data[0].capacity,
          connectivity: data[0].connectivity,
          points: data[0].price
        })
        data.forEach(objPart => {
          // temp fix, api response should be refactor
          if (objPart.model.toLowerCase().replace(/\s/g, '-') !== hero.model) {
            return
          }
          const finish_ = objPart.color.toLowerCase().replace(' ', '-')
          const productSize_ = objPart.productSize.replace('-inch', '')
          // get product family choices
          if (!model.includes(productSize_)) {
            model.push(productSize_)
          }
          if (!finish.includes(finish_)) {
            finish.push(finish_)
          }
          if (!capacity.includes(objPart.capacity)) {
            capacity.push(objPart.capacity)
          }
          if (!connectivity.includes(objPart.connectivity)) {
            connectivity.push(objPart.connectivity)
          }
          // 用來對應價格的 Object
          mapPrice[`${productSize_}${objPart.capacity}${objPart.connectivity}`] = {
            price: objPart.price,
            bounsPoint: objPart.bounsPoint
          }
          // 用來對應產品圖片的 Object
          mapImg[`${productSize_}${finish_}`] = objPart.IMGLink
          mapPartNumber[`${productSize_}${finish_}${objPart.capacity}${objPart.connectivity}`] = objPart.specName
          mapEngraving[objPart.specName] = objPart.engraving
          mapInstallment[objPart.specName] = objPart.installment
        })
        connectivity.sort((a, b) => {
          return a.length - b.length
        })
        state.ipadModel.connectivity = connectivity[0] || ''
        context.commit('initiPadModel', {
          model,
          finish,
          capacity,
          connectivity
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
