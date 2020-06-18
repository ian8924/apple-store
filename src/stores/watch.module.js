import api from './api/productinfo'
import { chapterNavBar } from './config/config.watch'

// const RAW_PATH = process.env.VUE_APP_RAW;
// const raw = require(`../views/${RAW_PATH}`);

// const raw_watch = raw['Watch'];

const watchModel = {
  color: '',
  model: '',
  connectivity: '',
  caseSize: '',
  bandSize: '',
  points: 0,
  pic: ''
}
const choicesWatch = { model: [], caseSize: [], bandSize: [], color: [], connectivity: [], mapBandCase: {} }

const listItemBands = {}
const mapImg = {}
const mapPrice = {}
const mapPartNumber = {}
const mapInstallment = {}
const mapEngraving = {}
const mapSummary = {}
const hero = ''
const bandType = ''

const state = {
  chapterNavBar,
  watchModel,
  choicesWatch,
  mapImg,
  mapPrice,
  mapPartNumber,
  mapInstallment,
  mapEngraving,
  mapSummary,
  hero,
  listItemBands,
  bandType
}
const getters = {
  currentHero: state => {
    return state.hero
  },
  currentModel: state => {
    return state.watchModel.model
  },
  currentColor: state => {
    return state.watchModel.color || ''
  },
  currentCaseSize: state => {
    return state.watchModel.caseSize || ''
  },
  currentBandSize: state => {
    return state.watchModel.bandSize || ''
  },
  currentConnectivity: state => {
    return state.watchModel.connectivity || ''
  },
  currentMapBandCase: (state, getters) => {
    return state.choicesWatch.mapBandCase[getters.currentColor] || []
  },
  currentPic: (state, getters) => {
    return state.mapImg[`${getters.currentBandSize}${getters.currentCaseSize}${getters.currentColor}`]
  },
  // 產品目前 PartNumbrt
  currentPartNumber: (state, getters) => {
    return state.mapPartNumber[`${getters.currentBandSize}${getters.currentCaseSize}${getters.currentColor}${getters.currentConnectivity}`]
  },
  currentInstallment: (state, getters) => {
    return state.mapInstallment[getters.currentPartNumber] || 1
  },
  currentEngraving: (state, getters) => {
    const isEngravable = Boolean(state.mapEngraving[getters.currentPartNumber] || 0)
    return isEngravable ? { msg1: '', msg2: '' } : false
  },
  currentSummary: (state, getters) => {
    return state.mapSummary[getters.currentPartNumber]
  },
  currentListItemBands: state => {
    return state.listItemBands
  },
  currentBandType: state => {
    return state.bandType
  },
  // 產品目前選擇項目需要花費的點數
  costPoints: (state, getters) => {
    if (Object.keys(state.mapPrice).length === 0) {
      return 0
    }
    const mapKey = `${getters.currentBandSize}${getters.currentCaseSize}${getters.currentColor}${getters.currentConnectivity}`
    if (!state.mapPrice[mapKey]) {
      return 0
    }
    state.watchModel.points = state.mapPrice[mapKey]
    return state.watchModel.points
  },
  availableChoices: state => {
    return state.choicesWatch
  },
  // 判斷目前產品選擇是否完成，讓需要選擇完成選項才出現的 DOM 才出現
  selectionCompleted: (state, getters) => {
    if (getters.currentSummary) {
      return true
    }
    return false
  },
  add2CartInfo: (state, getters) => {
    return {
      summary: getters.currentSummary,
      price: getters.costPoints,
      img: getters.currentPic,
      partNumber: getters.currentPartNumber,
      maxInstallment: getters.currentInstallment,
      engraving: getters.currentEngraving
    }
  }
}
const mutations = {
  setCurrentHero (state, hero) {
    for (const iterator of state.chapterNavBar) {
      const heroName = iterator.prodName + (` ${iterator.subName2}` || '')
      if (heroName.toLowerCase().replace(/\s/g, '-') === hero) {
        state.hero = heroName
        return
      }
    }
  },
  selectModel (state, option) {
    state.watchModel[option.type] = option.val
    if (option.type === 'color') {
      const { bandSize, caseSize } = state.choicesWatch.mapBandCase[option.val][0]
      state.watchModel.bandSize = bandSize
      state.watchModel.caseSize = caseSize
    }
  },
  selectBandType (state, option) {
    state.bandType = option
    const mapBandCase = {}

    const color = []
    const connectivity = []
    const swatch = {}
    const mapImg = {}
    const mapPrice = {}
    const mapPartNumber = {}
    const mapInstallment = {}
    const mapEngraving = {}
    const mapSummary = {}
    for (const band of state.listItemBands[option]) {
      if (!color.includes(band.color)) {
        color.push(band.color)
        swatch[band.color] = band.imgSwatch
      }

      if (!mapBandCase[band.color]) {
        mapBandCase[band.color] = []
      }

      mapBandCase[band.color].push({
        bandSize: band.bandSize,
        caseSize: band.caseSize
      })

      if (!connectivity.includes(band.connectivity) && band.connectivity) {
        connectivity.push(band.connectivity)
      }

      const mapKey = `${band.bandSize}${band.caseSize}${band.color}`
      mapImg[mapKey] = band.IMGLink
      mapPartNumber[mapKey] = band.specName
      mapPrice[mapKey] = band.price
      mapSummary[band.specName] = band.title
      mapEngraving[band.specName] = band.engraving
      mapInstallment[band.specName] = band.installment
    }
    state.choicesWatch = {
      color,
      connectivity,
      mapBandCase,
      swatch
    }
    state.mapPrice = mapPrice
    state.mapPartNumber = mapPartNumber
    state.mapImg = mapImg
    state.mapSummary = mapSummary
    state.mapEngraving = mapEngraving
    state.mapInstallment = mapInstallment

    state.watchModel = {
      color: color[0] || '',
      model: '',
      connectivity: '',
      caseSize: state.listItemBands[option][0].caseSize || '',
      bandSize: state.listItemBands[option][0].bandSize || '',
      points: 0,
      pic: ''
    }
  },
  selectWatchType (state, option) {
    state.bandType = option
    const mapBandCase = {}

    const color = []
    const connectivity = []
    const caseSize = []

    const swatch = {}
    const mapImg = {}
    const mapPrice = {}

    const mapPartNumber = {}
    const mapInstallment = {}
    const mapEngraving = {}
    const mapSummary = {}
    for (const band of state.listItemBands[option]) {
      // if (!color.includes(band.color)) {
      //   color.push(band.color);
      //   swatch[band.color] = band.imgSwatch;
      // }

      // if (!mapBandCase[band.color]) {
      //   mapBandCase[band.color] = [];
      // }

      // mapBandCase[band.color].push({
      //   bandSize: band.bandSize,
      //   caseSize: band.caseSize
      // });

      if (!caseSize.includes(band.caseSize) && band.caseSize) {
        caseSize.push(band.caseSize)
      }

      if (!connectivity.includes(band.connectivity) && band.connectivity) {
        connectivity.push(band.connectivity)
      }
      mapImg[`${band.caseSize}`] = band.IMGLink
      mapPartNumber[`${band.caseSize}${band.connectivity}`] = band.specName
      mapPrice[`${band.caseSize}${band.connectivity}`] = band.price
      mapSummary[band.specName] = band.title
      mapEngraving[band.specName] = band.engraving
      mapInstallment[band.specName] = band.installment
    }
    state.choicesWatch = {
      color,
      connectivity,
      mapBandCase,
      caseSize,
      swatch
    }
    state.mapPrice = mapPrice
    state.mapPartNumber = mapPartNumber
    state.mapImg = mapImg
    state.mapSummary = mapSummary
    state.mapEngraving = mapEngraving
    state.mapInstallment = mapInstallment

    state.watchModel = {
      color: color[0] || '',
      model: '',
      connectivity: connectivity[0] || '',
      caseSize: state.listItemBands[option][0].caseSize || '',
      bandSize: state.listItemBands[option][0].bandSize || '',
      points: 0,
      pic: ''
    }
  },
  initListItemBands (state, option) {
    state.listItemBands = option
  },
  initWatchModel (state, option) {
    state.choicesWatch = option
    state.watchModel.color = option.color[0] || ''
    state.watchModel.bandSize = option.bandSize[0] || ''
    state.watchModel.caseSize = option.caseSize[0] || ''
  },
  initImgMap (state, option) {
    state.mapImg = option
  },
  resetState (state) {
    // 頁面移除時，清除 state
    state.watchModel = watchModel
    state.choicesWatch = choicesWatch
    state.mapImg = mapImg
    state.mapPrice = mapPrice
    state.mapPartNumber = mapPartNumber
    state.mapSummary = mapSummary
    state.hero = hero
  }
}
const actions = {
  getWatchInfo ({ commit }, hero) {
    commit('setCurrentHero', hero.model)
    commit('changeWaitServerResponse', true, { root: true })
    commit('initListItemBands', {})

    api
      .getProductList(hero.model.replace(/-/g, '_').replace('apple_', ''), 'VISA')
      .then(({ data }) => {
        data = data.sort((a, b) => {
          return a.price - b.price
        })
        const listItemBands = {}
        switch (hero.model) {
          case 'bands':
            for (const band of data) {
              if (!listItemBands[band.bandType]) {
                listItemBands[band.bandType] = []
              }
              listItemBands[band.bandType].push(band)
            }
            break
          default:
            for (const watch of data) {
              if (!listItemBands[watch.watchType]) {
                listItemBands[watch.watchType] = []
              }
              listItemBands[watch.watchType].push(watch)
            }
            break
        }
        commit('initListItemBands', listItemBands)

        if (Object.keys(listItemBands).length === 0) {
          commit('resetState')
        }
      })
      .finally(() => {
        commit('changeWaitServerResponse', false, { root: true })
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
