import api from './api/productinfo'
import { chapterNavBar } from './config/config.iphone'

// const RAW_PATH = process.env.VUE_APP_RAW;
// const raw = require(`../views/${RAW_PATH}`);

// const raw_iphone = raw['iPhone'];
const iphoneModel = {
  finish: '',
  model: '',
  capacity: '',
  points: 0,
  pic: ''
}

const choicesiPhones = { model: [], finish: [], capacity: [] }

const textSummry = ''
const mapImg = {}
const mapPrice = {}
const mapPartNumber = {}
const mapInstallment = {}
const mapEngraving = {}
const hero = ''
const state = {
  chapterNavBar,
  iphoneModel,
  choicesiPhones,
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
    return state.iphoneModel.finish
  },
  // 產品目前選擇容量
  currentCapacity: state => {
    return state.iphoneModel.capacity
  },
  // 產品目前選擇機型
  currentModel: state => {
    return state.iphoneModel.model
  },
  // 產品目前顯示圖片
  currentPic: (state, getters) => {
    // map current pic
    return state.mapImg[`${getters.currentModel}${getters.currentFinish}`]
  },
  // 產品目前 PartNumbrt
  currentPartNumber: (state, getters) => {
    return state.mapPartNumber[`${getters.currentModel}${getters.currentFinish}${getters.currentCapacity}`]
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
    return state.iphoneModel
  },
  // 判斷目前產品選擇是否完成，讓需要選擇完成選項才出現的 DOM 才出現
  selectionCompleted: state => {
    if (Object.keys(state.iphoneModel).length === 0) {
      return false
    }
    for (const key in state.iphoneModel) {
      if (key === 'pic') {
        continue
      }
      if (!(state.iphoneModel[key] || false)) {
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
    state.iphoneModel.points = state.mapPrice[`${getters.currentModel}${getters.currentCapacity}`].price
    return state.iphoneModel.points
  },
  // 由 API 從後端拿到的產品選項
  availableChoices: state => {
    return state.choicesiPhones
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
    state.iphoneModel[option.type] = option.val
  },
  setCurreniPhoneModel (state, defaultModel) {
    state.iphoneModel = defaultModel
  },
  initiPhoneModel (state, option) {
    state.choicesiPhones = option
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
        state.hero = iterator.prodName + (iterator.subName || '')
        return
      }
    }
  },
  resetState (state) {
    // 頁面移除時，清除 state
    state.iphoneModel = iphoneModel
    state.choicesiPhones = choicesiPhones
    state.mapImg = mapImg
    state.mapPrice = mapPrice
    state.hero = hero
  },
  setTextSummary (state, Text) {
    state.textSummry = Text
  }
}
const actions = {
  getiPhoneInfo (context, hero) {
    // 之後應該是向後台拿資料
    // 後台給商品資料陣列
    // 取出所有的選項＆建立的價格跟圖片的 map
    // https://stackoverflow.com/questions/44618440/vuex-how-to-commit-a-global-mutation-in-a-module-action
    context.commit('setCurrentHero', hero.model)
    context.commit('changeWaitServerResponse', true, { root: true })
    api
      .getProductList(hero.model.replace(/-/g, '_'), 'VISA')
      .then(({ data }) => {
        data = data.sort((a, b) => {
          return a.price - b.price
        })
        switch (hero.model) {
          case 'iphone-11':
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
        // context.commit('ProductDetail', data);
        const model = []
        const finish = []
        const capacity = []
        const mapImg = {}
        const mapPrice = {}
        const mapPartNumber = {}
        const mapInstallment = {}
        const mapEngraving = {}
        context.commit('setCurreniPhoneModel', {
          finish: data[0].color.toLowerCase().replace(' ', '-'),
          model: data[0].model,
          capacity: data[0].capacity,
          points: data[0].price
        })
        data.forEach(objPart => {
          const finish_ = objPart.color.toLowerCase().replace(' ', '-')
          // get product family choices
          if (!model.includes(objPart.model)) {
            model.push(objPart.model)
          }
          if (!finish.includes(finish_)) {
            finish.push(finish_)
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
          mapImg[`${objPart.model}${finish_}`] = objPart.IMGLink
          mapPartNumber[`${objPart.model}${finish_}${objPart.capacity}`] = objPart.specName
          mapInstallment[objPart.specName] = objPart.installment
        })
        context.commit('initiPhoneModel', {
          model,
          finish,
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
