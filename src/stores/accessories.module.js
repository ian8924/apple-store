// import data from '../views/raw_20190923_0440.json';
// import { FILTER_KEYWORDS } from './config/config.acc';
import api from './api/productinfo'
// const RAW_PATH = process.env.VUE_APP_RAW;
// const data = require(`../views/${RAW_PATH}`);

// let raw_mac = {};
// let raw_iphone = {};
// let raw_ipad = {};
// let raw_watch = {};
// let raw_tv = {};
// let raw_music = {};

const listItemAcc = {}
const choicesAccType = {}
const accType = ''
const mapImg = {}
const mapPrice = {}
const mapPartNumber = {}
const mapSummary = {}
const mapInstallment = {}
const mapEngraving = {}
const nowQuery = { category: '', filter: '' }
const choicesAcc = { color: [], inputType: [], swatch: {}, displayGlass: [] }
const accModel = { color: '', inputType: '', displayGlass: '' }

/*
for (const key in data.Accessories) {
  for (const item of data.Accessories[key]) {
    let type = item.name.replace('\xa0', ' ');
    type = item.name
      .replace(item.color, '')
      .replace(item.inputType || '', '')
      .replace(' - ', '');
    if (item.name.includes('iPhone') || item.model.includes('iPhone')) {
      if (!raw_iphone[type]) raw_iphone[type] = [];
      raw_iphone[type].push(item);
    }

    if (item.name.includes('Mac') || item.model.includes('Mac')) {
      if (!raw_mac[type]) raw_mac[type] = [];

      raw_mac[type].push(item);
    }

    if (item.name.includes('iPad') || item.model.includes('iPad')) {
      if (!raw_ipad[type]) raw_ipad[type] = [];

      raw_ipad[type].push(item);
    }

    if (item.name.includes('Watch')) {
      if (!raw_watch[type]) raw_watch[type] = [];

      raw_watch[type].push(item);
    }

    if (item.name.includes('TV')) {
      if (!raw_tv[type]) raw_tv[type] = [];

      raw_tv[type].push(item);
    }

    if (item.name.includes('Music')) {
      if (!raw_music[type]) raw_music[type] = [];

      raw_music[type].push(item);
    }
  }
}
for (const LoB in data) {
  if (LoB === 'Accessories') continue;
  for (const Brand in data[LoB]) {
    if (!Brand.includes('Accessories') && Brand !== 'Beats') continue;
    for (const item of data[LoB][Brand]) {
      let type = item.name.replace('\xa0', ' ');

      type = item.name
        .replace(item.color, '')
        .replace(item.inputType || '', '')
        .replace(' - ', '');

      if (LoB === 'iPhone') {
        if (!raw_iphone[type]) raw_iphone[type] = [];
        raw_iphone[type].push(item);
      }
      if (LoB === 'iPad') {
        if (!raw_ipad[type]) raw_ipad[type] = [];

        raw_ipad[type].push(item);
      }
      if (LoB === 'Mac') {
        if (!raw_mac[type]) raw_mac[type] = [];

        raw_mac[type].push(item);
      }
      if (LoB === 'Watch') {
        if (!raw_watch[type]) raw_watch[type] = [];

        raw_watch[type].push(item);
      }
      if (LoB === 'Apple TV') {
        if (!raw_tv[type]) raw_tv[type] = [];

        raw_tv[type].push(item);
      }
      if (LoB === 'Music') {
        if (!raw_music[type]) raw_music[type] = [];

        raw_music[type].push(item);
      }
    }
  }
}

const raw = {
  iphone: raw_iphone,
  mac: raw_mac,
  ipad: raw_ipad,
  watch: raw_watch,
  tv: raw_tv,
  music: raw_music
};
*/

const state = {
  listItemAcc,
  choicesAccType,
  choicesAcc,
  nowQuery,
  mapImg,
  mapPrice,
  mapPartNumber,
  mapInstallment,
  mapEngraving,
  mapSummary,
  accModel,
  accType
}
const getters = {
  availableAccType: state => {
    return state.choicesAccType
  },
  currentHero: state => {
    return state.accType
  },
  nowQuery: state => {
    return state.nowQuery
  },
  currentColor: state => {
    return state.accModel.color || ''
  },
  currentInputType: state => {
    return state.accModel.inputType || ''
  },
  currentDisplayGlass: state => {
    return state.accModel.displayGlass || ''
  },
  currentPic: (state, getters) => {
    return state.mapImg[`${getters.currentInputType}${getters.currentColor}${getters.currentDisplayGlass}`]
  },
  currentSummary: (state, getters) => {
    return state.mapSummary[`${getters.currentInputType}${getters.currentColor}${getters.currentDisplayGlass}`]
  },
  // 產品目前 PartNumbrt
  currentPartNumber: (state, getters) => {
    return state.mapPartNumber[`${getters.currentInputType}${getters.currentColor}${getters.currentDisplayGlass}`]
  },
  currentInstallment: (state, getters) => {
    return state.mapInstallment[getters.currentPartNumber] || 1
  },
  currentEngraving: (state, getters) => {
    const isEngravable = Boolean(state.mapEngraving[getters.currentPartNumber] || 0)
    return isEngravable ? { msg1: '', msg2: '' } : false
  },
  costPoints: (state, getters) => {
    return state.mapPrice[`${getters.currentInputType}${getters.currentColor}${getters.currentDisplayGlass}`]
  },
  availableChoices: state => {
    return state.choicesAcc
  },
  selectionCompleted: (state, getters) => {
    for (const key in getters.add2CartInfo) {
      if (key === 'engraving') continue
      if (!getters.add2CartInfo[key]) {
        return false
      }
    }
    return true
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
const actions = {
  getAccInfo (context, { category, filter }) {
    context.commit('changeWaitServerResponse', true, { root: true })
    context.commit('setNowQuery', { category, filter })
    const category_ = filter ? category : 'Accessories'
    const filter_ = filter || category
    // filter = filter ? filter : 'Accessories';
    api
      .getProductList(category_, 'VISA', filter_)
      .then(({ data }) => {
        data = data.sort((a, b) => a.price - b.price)
        context.commit('setCurrentCategory', data)
      })
      .catch(() => {
        context.commit('setCurrentCategory', [])
        // console.log('TCL: err', err);
      })
      .finally(() => {
        context.commit('changeWaitServerResponse', false, { root: true })
      })
  }
}
const mutations = {
  setCurrentCategory (state, data) {
    /*
    const tags = FILTER_KEYWORDS[filter] || [];
    let filter_raw = {};
    if (filter && tags) {
      for (const key in raw[category]) {
        for (const tag of tags) {
          if (key.includes(tag)) {
            switch (filter) {
              case 'Power & Cables':
                if (key.includes('AirPods') || key.includes('Mount')) {
                  continue;
                }
                break;
              case 'Cases & Protection':
                if (key.includes('AirPods')) {
                  continue;
                }
                break;
              case 'Creativity':
                if (key.includes('Case')) {
                  continue;
                }
                break;
            }
            filter_raw[key] = raw[category][key];
            break;
          }
        }
      }
      state.choicesAccType = filter_raw;
    } else {
      state.choicesAccType = raw[category];
    }
    */
    const filterRaw = {}
    for (const item of data) {
      const type = item.name
        .replace(item.color, '')
        .replace(item.inputType || '', '')
        .replace(' - ', '')
      if (!filterRaw[type]) {
        filterRaw[type] = []
      }
      filterRaw[type].push(item)
    }
    state.choicesAccType = filterRaw
  },
  selectModel (state, option) {
    state.accModel[option.type] = option.val
  },
  selectAccType (state, accType) {
    state.accType = accType
    const color = []
    const inputType = []
    const swatch = {}
    const displayGlass = []
    const mapImg = {}
    const mapPartNumber = {}
    const mapInstallment = {}
    const mapEngraving = {}
    const mapSummary = {}
    const mapPrice = {}
    for (const item of state.choicesAccType[accType]) {
      if (item.color && !color.includes(item.color)) {
        color.push(item.color)
        swatch[item.color] = item.imgSwatch
      }
      if (item.displayGlass && !displayGlass.includes(item.displayGlass)) {
        displayGlass.push(item.displayGlass)
      }
      if (item.inputType && !inputType.includes(item.inputType || '')) {
        inputType.push(item.inputType)
      }
      const mapKey = `${item.inputType || ''}${item.color}${item.displayGlass || ''}`

      mapImg[mapKey] = item.IMGLink
      mapPartNumber[mapKey] = item.specName
      mapSummary[mapKey] = item.title
      mapPrice[mapKey] = item.price
      mapEngraving[item.specName] = item.engraving
      mapInstallment[item.specName] = item.installment
    }

    state.choicesAcc = {
      color,
      inputType,
      swatch,
      displayGlass
    }
    state.accModel = {
      color: color[0] || '',
      inputType: inputType[0] || '',
      displayGlass: displayGlass[0] || ''
    }
    state.mapImg = mapImg
    state.mapPartNumber = mapPartNumber
    state.mapSummary = mapSummary
    state.mapEngraving = mapEngraving
    state.mapInstallment = mapInstallment
    state.mapPrice = mapPrice
  },
  resetState () {
    // state.accModel = accModel;
  },
  setNowQuery (state, payload) {
    state.nowQuery = payload
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
