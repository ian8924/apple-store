<template>
  <main>
    <div class="container-fluid bg-white">
      <div class="row customize-content">
        <!-- 訂單列表 -->
        <slot v-if="!showOrderDetail">
          <div
            class="col-12 page-title"
          >
            <h3>訂單查詢管理</h3>
            <p>可查詢兩年內訂單</p>
          </div>
          <div
            class="row customize-content"
          >
            <div
              class="col-12"
            >
              <ListItemOrderState
                v-for="(item, index) in historyOrder"
                :key="index"
                :item="item"
                @click="goOrderDetail(index)"
              />
            </div>
            <!-- 查無訂單提示-->
            <ListItemOrderNone
              v-if="historyOrder.length === 0"
              class="col-12 p-0"
            />
          </div>
        </slot>
        <!-- 訂單內容 -->
        <transition
          name="slide-fade"
        >
          <div
            v-if="showOrderDetail"
          >
            <div
              class="col-12 localnav-header"
            >
              <button
                class="color-gold text-nowrap pr-2"
                @click="goManagement"
              >
                <i class="fas fa-long-arrow-alt-left" />
              </button>
              <h2 class="d-inline-block">
                訂單資訊
              </h2>
            </div>
            <!-- 商品資訊 -->
            <DisplayOrderProduct
              :list-productin-cart="orderProduct"
            >
              <span
                class="small d-none"
                :class="[stateClass[orderDetail.step]]"
              >{{
                stateName[orderDetail.step]
              }}</span>
            </DisplayOrderProduct>
            <!-- 寄送資訊 -->
            <DisplayOrderRecipient
              :recipient-info="orderRecipient"
            />
            <!-- 付款資訊 -->
            <DisplayOrderPayment
              :key="'DisplayOrderPayment'"
              :payment-info="orderPayment"
            />
          </div>
        </transition>
      </div>
    </div>
  </main>
</template>

<script>
import moment from 'moment'
import ListItemOrderState from '@/components/DisplayOrder/ListItemOrderState'
import ListItemOrderNone from '@/components/DisplayOrder/ListItemOrderNone'
import DisplayOrderProduct from '@/components/DisplayOrder/DisplayOrderProduct'
import DisplayOrderRecipient from '@/components/DisplayOrder/DisplayOrderRecipient'
import DisplayOrderPayment from '@/components/DisplayOrder/DisplayOrderPayment'

import { stateClass, stateName } from '../../stores/config/config.orederstate'

export default {
  name: 'Management',
  components: {
    ListItemOrderState,
    ListItemOrderNone,
    DisplayOrderProduct,
    DisplayOrderRecipient,
    DisplayOrderPayment
  },
  data () {
    return {
      showOrderDetail: false,
      indexOrder: -1,
      stateClass,
      stateName
    }
  },
  computed: {
    historyOrder () {
      const historyOrder = this.$store.getters['cart/currentHistoryOrder']
      return historyOrder.sort((a, b) => {
        return new Date(b.date).valueOf() - new Date(a.date).valueOf()
      })
      // return historyOrder.filter(order => order.prodDetail.ProdSpecID > 0)
    },
    orderDetail () {
      return this.historyOrder[this.indexOrder]
    },
    orderProduct () {
      const orderProducts = []
      const detail = this.orderDetail.prodDetail
      detail.forEach(item => {
        let summary = item.prodDetail.title || item.prodDetail.name
        summary =
        summary + (item.prodDetail.bandSizeInfo ? `，${item.prodDetail.bandSizeInfo}` : '')
        const engraving = item.prodDetail.engraving || {}
        orderProducts.push({ img: item.prodDetail.IMGLink, quantity: 1, summary, engraving, step: item.Step })
      })
      return orderProducts
    },
    orderRecipient () {
      return {
        orderID: this.orderDetail.orderID,
        date: moment(this.orderDetail.date.split('T')[0]).format('YYYY-MM-DD'),
        DeliverEmail: this.orderDetail.email || '',
        DeliverAddress: this.orderDetail.deliverAddress,
        DeliverName: this.orderDetail.deliverName,
        DeliverMobile: this.orderDetail.deliverMobile
      }
    },
    orderPayment () {
      const cardNum = this.orderDetail.cardNum || '**** ****'
      const totalCost = parseInt(this.orderDetail.selfCost || 0)
      const bonusType = this.orderDetail.bonusType || ''
      const visaDiscount = parseInt(this.orderDetail.discountCost || 0)
      const price = this.orderDetail.prodDetail.Price || 0
      const points = this.orderDetail.useBonusPoint || 0
      const selfCost = totalCost - visaDiscount
      const installment = this.orderDetail.installMentPlanNum
      const discountPrice = price - selfCost
      return {
        cardNum: `**** **** **** ${cardNum.slice(-4)}`,
        useBonusPoint: `NT$ ${discountPrice.toLocaleString()} (以 ${points.toLocaleString()} 點${bonusType}折抵）`,
        price: `NT$ ${totalCost.toLocaleString()}`,
        selfCost: `NT$ ${selfCost.toLocaleString()}`,
        discountPrice: `NT$ ${visaDiscount}`,
        installmentInfo: installment > 1 ? `${installment} 期` : '不分期',
        sendReceiptType: this.orderDetail.sendReceiptType
      }
    }
  },
  created () {
    this.getHistoryOrder()
  },
  methods: {
    goOrderDetail (event) {
      this.indexOrder = parseInt(event)
      this.showOrderDetail = true
    },
    goManagement () {
      this.showOrderDetail = false
    },
    async getHistoryOrder () {
      if (this.historyOrder.length === 0) {
        this.$store.commit('changeWaitServerResponse', true)
        await this.$store.dispatch('cart/historyOrder')
        this.$store.commit('changeWaitServerResponse', false)
      }
    }
  }
}
</script>
