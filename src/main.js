import Vue from 'vue'
import App from './App.vue'
import store from './stores/store'
import router from './router'
import i18n from './plugins/i18n'
import VueAnalytics from 'vue-analytics'
import './assets/css/finish.css'
import './assets/css/style_scroll.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'jquery'
import 'popper.js'
import './until/validate/validate'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ButtonPrimary from './components/base/Button/ButtonPrimary.vue'
import DisplayServerError from './components/ServerError/DisplayServerError'
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ButtonPrimary', ButtonPrimary)
Vue.component('DisplayServerError', DisplayServerError)

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GA_ID,
  router,
  debug: {
    sendHitTask: process.env.VUE_APP_IS_LOCAL !== 'true'
  }
})
Vue.config.productionTip = false
// use beforeEach route guard to set the language
router.beforeEach((to, from, next) => {
  // use the language from the routing param or default language
  let language = to.params.lang
  if (!i18n.availableLocales.includes(language)) {
    language = i18n.fallbackLocale
  }
  document.title =
    i18n.messages[language].title[to.name] + ' ' + process.env.VUE_APP_TITLE
  // set the current language for vuex-i18n. note that translation data
  // for the language might need to be loaded first
  i18n.locale = language
  next()
})
new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
