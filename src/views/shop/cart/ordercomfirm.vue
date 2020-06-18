<template>
  <main>
    <div class="row customize-content">
      <div class="col-12 localnav-header">
        <p class="d-inline-block h2">
          確認訂單資訊
        </p>
      </div>
      <!-- 商品資訊 -->
      <DisplayOrderProduct
        :list-productin-cart="listProductinCart"
      />
      <!-- 寄送資訊 -->
      <DisplayOrderRecipient
        :recipient-info="currentRecipientInfo"
      />
      <!-- 付款資訊 -->
      <DisplayOrderPayment
        :payment-info="currentPaymentInfo"
      />
    </div>
    <div class="row customize-content">
      <div class="col-12 action-group">
        <ButtonCancel
          text="回上頁"
          @click="goBack"
        />
        <ButtonPrimary
          text="立即下單"
          @click="checkPayment"
        />
      </div>
    </div>
    <ModalOrderCheck
      :show-modal="showModal"
      @close="showModal=false"
      @goSwipeCard="goSwipeCard"
    />
  </main>
</template>

<script>
import moment from 'moment'
import DisplayOrderProduct from '@/components/DisplayOrder/DisplayOrderProduct'
import DisplayOrderRecipient from '@/components/DisplayOrder/DisplayOrderRecipient'
import DisplayOrderPayment from '@/components/DisplayOrder/DisplayOrderPayment'
import ModalOrderCheck from './Modal/ModalOrderCheck'
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'
import ButtonCancel from '@/components/base/Button/ButtonCancel'
export default {
  name: 'OrderComfirm',
  components: {
    ButtonCancel,
    ButtonPrimary,
    DisplayOrderProduct,
    DisplayOrderRecipient,
    DisplayOrderPayment,
    ModalOrderCheck
  },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    listProductinCart () {
      return this.$store.getters['cart/listProductinCart']
    },
    // 寄送資訊
    currentRecipientInfo () {
      const recipientInfo = this.$store.getters['cart/currentRecipientInfo']
      const orderInfo = this.$store.getters['cart/currentOrder']
      let DeliverAddress
      if (recipientInfo.recipientAddress) {
        DeliverAddress = `${recipientInfo.recipientAddress.city}${recipientInfo.recipientAddress.area}${recipientInfo.recipientAddress.address}`
      }
      const info = {
        orderID: orderInfo.orderID,
        date: moment(orderInfo.date).format('YYYY-MM-DD'),
        DeliverEmail: recipientInfo.recipientEmail,
        DeliverAddress,
        DeliverName: recipientInfo.recipientName,
        DeliverMobile: recipientInfo.recipientMobile
      }
      return info
    },
    // 付款資訊
    currentPaymentInfo () {
      const swipeCard = this.$store.getters['cart/currentSwipeCard']
      const totalPrice = this.$store.getters['cart/totalPrice']
      const discountPrice = this.$store.getters['cart/discountPrice']
      const selfPay = totalPrice - discountPrice
      const invoice = this.$store.getters['cart/currentInvoiceInfo']
      return {
        cardNum: `****** ${swipeCard.substring(12, 16)}`,
        price: `NT$ ${totalPrice.toLocaleString()}`,
        discountPrice: `NT$ ${discountPrice.toLocaleString()}`,
        selfCost: `NT$ ${selfPay.toLocaleString()}`,
        sendReceiptType: invoice.type
      }
    }
  },
  methods: {
    goBack () {
      this.$router.push({ name: 'payment' })
    },
    // 確認刷卡modal
    checkPayment () {
      this.showModal = true
    },
    // 確認下單,並刷卡
    async  goSwipeCard () {
      const result = await this.$store.dispatch('cart/createOrder')
      if (!result) {
        this.$router.push({ name: 'order failure' })
        return
      }
      this.$store.dispatch('cart/checkoutOrder')
    }
  }
}
</script>
