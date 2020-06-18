import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import $i18n from '../plugins/i18n'
import store from '../stores/store'

Vue.use(Router)

function checkLocaleExist (to, from, next) {
  // 過濾不合法的 params lang
  if (!$i18n.availableLocales.includes(to.params.lang)) {
    next({ path: `/${$i18n.fallbackLocale}` })
    return
  }
  next()
}
function checkLoggedIn (to, from, next) {
  if (!store.getters['member/isLoggedIn']) {
    next({ name: 'signin' })
    return
  }
  next()
}
function checkNotLoggedIn (to, from, next) {
  if (store.getters['member/isLoggedIn']) {
    next({ name: 'home' })
    return
  }
  next()
}

function checkCart (to, from, next) {
  if (!store.getters['member/isLoggedIn']) {
    next({ name: 'signin' })
    return
  }
  if (store.getters['cart/listProductinCart'].length === 0) {
    next({ name: 'home' })
    return
  }
  next()
}

// 官網設定 CustomerType
function setCustomerTypeCanlead (to, from, next) {
  store.commit('product/setCustomerType', 'Canlead')
  next()
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    // https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: `/${$i18n.fallbackLocale}`
    },
    {
      path: '/:lang',
      component: () => import(/* webpackChunkName: "lang" */ '../views/lang.vue'),
      beforeEnter: checkLocaleExist,
      children: [
        {
          path: '',
          component: () => import('../layout/official/index.vue'),
          beforeEnter: setCustomerTypeCanlead, // 進入頁面時先設定 CustomerType
          children: [
            {
              path: '',
              name: 'home',
              component: Home
            },
            {
              path: 'accessories',
              name: 'Accessories',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              // component: () =>
              // import(/* webpackChunkName: "about" */ './views/iphone/iphone.vue')
              component: () => import(/* webpackChunkName: "accessories" */ '../views/shop/accessories/Accessories.vue')
            },
            {
              path: 'mac',
              name: 'Mac',
              component: () => import(/* webpackChunkName: "mac" */ '../views/shop/mac/mac.vue')
            },
            {
              path: 'iphone',
              name: 'iPhone',
              component: () => import(/* webpackChunkName: "iphone" */ '../views/shop/iphone/iphone.vue')
            },
            {
              path: 'ipad',
              name: 'iPad',
              component: () => import(/* webpackChunkName: "ipad" */ '../views/shop/ipad/ipad.vue')
            },
            {
              path: 'watch',
              name: 'Watch',
              component: () => import(/* webpackChunkName: "watch" */ '../views/shop/watch/watch.vue')
            },
            {
              path: 'tv',
              name: 'TV',
              component: () => import(/* webpackChunkName: "tv" */ '../views/shop/tv/tv.vue')
            },
            {
              path: 'music',
              name: 'Music',
              component: () => import(/* webpackChunkName: "music" */ '../views/shop/music/music.vue')
            },
            {
              path: 'signin',
              name: 'signin',
              component: () => import(/* webpackChunkName: "signin" */ '../views/member/signin.vue'),
              beforeEnter: checkNotLoggedIn
            },
            {
              path: 'terms-condition',
              name: 'tnc',
              component: () => import(/* webpackChunkName: "tnc" */ '../views/tnc.vue')
            },
            {
              path: 'terms-use',
              name: 'tnc all',
              component: () => import(/* webpackChunkName: "tncall" */ '../views/tncall.vue')
            },
            {
              path: 'faq',
              name: 'faq',
              component: () => import(/* webpackChunkName: "faq" */ '../views/faq.vue')
            },
            {
              path: 'account',
              component: {
                render (h) {
                  return h('router-view')
                }
              },
              children: [
                {
                  path: '',
                  name: 'registry',
                  component: () => import(/* webpackChunkName: "account" */ '../views/member/account.vue'),
                  beforeEnter: checkNotLoggedIn
                },
                {
                  path: 'info',
                  name: 'edit account',
                  component: () => import(/* webpackChunkName: "userinfo" */ '../views/member/userinfo.vue'),
                  beforeEnter: checkLoggedIn
                },
                {
                  path: 'verify',
                  name: 'verify',
                  component: () => import(/* webpackChunkName: "verify" */ '../views/member/verify.vue'),
                  beforeEnter: checkNotLoggedIn
                },
                {
                  path: 'order',
                  name: 'order',
                  component: () => import(/* webpackChunkName: "management" */ '../views/member/management.vue'),
                  beforeEnter: checkLoggedIn
                },
                {
                  path: 'reset',
                  name: 'Reset Password Success',
                  component: () => import(/* webpackChunkName: "reset" */ '../views/member/reset.vue')
                },
                {
                  path: 'forget',
                  name: 'forget password',
                  component: () => import(/* webpackChunkName: "forget" */ '../views/member/password.vue'),
                  beforeEnter: checkNotLoggedIn
                }
              ]
            },
            {
              path: 'shop',
              name: 'shop',
              component: () => import(/* webpackChunkName: "shop" */ '../views/shop/index.vue'),
              children: [
                {
                  path: 'buy-mac/:hero',
                  name: 'Redeem Mac',
                  component: () => import(/* webpackChunkName: "buymac" */ '../views/shop/mac/buymac.vue')
                },
                {
                  path: 'buy-iphone/:hero',
                  name: 'Redeem iPhone',
                  component: () => import(/* webpackChunkName: "buyiphone" */ '../views/shop/iphone/buyiphone.vue')
                },
                {
                  path: 'buy-ipad/:hero',
                  name: 'Redeem iPad',
                  component: () => import(/* webpackChunkName: "buyipad" */ '../views/shop/ipad/buyipad.vue')
                },
                {
                  path: 'buy-tv/:hero',
                  name: 'Redeem Apple TV',
                  component: () => import(/* webpackChunkName: "buyappletv" */ '../views/shop/tv/buyappletv.vue')
                },
                {
                  path: 'buy-watch/:hero',
                  name: 'Redeem Apple Watch',
                  component: () => import(/* webpackChunkName: "buywatch" */ '../views/shop/watch/buywatch.vue')
                },
                {
                  path: 'buy-music/:hero',
                  name: 'Redeem iPod',
                  component: () => import(/* webpackChunkName: "buyipodtouch" */ '../views/shop/music/buyipodtouch.vue')
                },
                {
                  path: 'buy-accessories/:hero',
                  name: 'Redeem Acc',
                  component: () => import(/* webpackChunkName: "buyacc" */ '../views/shop/accessories/buyacc.vue')
                },
                {
                  path: 'bag',
                  name: 'shop bag',
                  component: () => import(/* webpackChunkName: "cart" */ '../views/shop/cart/cart.vue'),
                  meta: { keepAlive: true }
                },
                {
                  path: 'payment',
                  name: 'payment',
                  component: () => import(/* webpackChunkName: "cart" */ '../views/shop/cart/orderpayment'),
                  meta: { keepAlive: true }
                },
                {
                  path: 'order',
                  name: 'order comfirm',
                  component: () => import(/* webpackChunkName: "ordercomfirm" */ '../views/shop/cart/ordercomfirm.vue'),
                  beforeEnter: checkCart
                },
                {
                  path: 'complete',
                  name: 'order complete',
                  component: () => import(/* webpackChunkName: "ordercomplete" */ '../views/shop/cart/ordercomplete.vue')
                },
                {
                  path: 'failure',
                  name: 'order failure',
                  component: () => import(/* webpackChunkName: "orderfailure" */ '../views/shop/cart/orderfailure.vue')
                }
              ]
            },
            {
              path: 'visa',
              name: 'visa',
              component: () => import(/* webpackChunkName: "project-visa" */ '../views/project/visa'),
              redirect: { name: 'visa tc' },
              children: [
                {
                  path: 'tc',
                  name: 'visa tc',
                  component: () => import(/* webpackChunkName: "project-visa" */ '../views/project/visa/VisaEvent.vue')
                },
                {
                  path: 'verify',
                  name: 'visa verify',
                  component: () => import(/* webpackChunkName: "project-visa" */ '../views/project/visa/VisaVerify.vue')
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
