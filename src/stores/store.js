import Vue from 'vue'
import Vuex from 'vuex'

import mac from './mac.module'
import iphone from './iphone.module'
import ipad from './ipad.module'
import watch from './watch.module'
import tv from './tv.module'
import music from './music.module'
import accessories from './accessories.module'

import cart from './cart.module'
import product from './product.module'
import member from './member.module'

const modules = { mac, iphone, ipad, watch, tv, music, accessories, cart, product, member }
Vue.use(Vuex)

Vuex.Store.prototype.hasModule = function (module) {
  return this._modules.root._children[module] !== undefined
}

const waitServerResponse = false
export default new Vuex.Store({
  modules,
  state: { currentSelection: {}, waitServerResponse },
  getters: {
    currentSelection: state => {
      return state.currentSelection
    },

    // 控制 chapter navbar 是否顯示
    showNavBarChapter: state => {
      return state.product.currentProductList || state.currentSelection.Type || false
    },
    waitServerResponse_ (state) {
      return state.waitServerResponse
    }
  },
  mutations: {
    changeSelection (state, selection) {
      /*
      { Type: 'iphone', product: 'selectXSModel' };
      */
      state.currentSelection = selection
    },
    changeWaitServerResponse (state, isWaiting) {
      state.waitServerResponse = isWaiting
    }
  },
  actions: {}
})
