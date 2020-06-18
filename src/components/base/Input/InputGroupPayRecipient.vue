<template>
  <div class="row customize-content mt-5">
    <div class="col-12 localnav-header">
      <h2>收件資料</h2>
    </div>
    <div class="col-md-6">
      <div class="mb-2">
        <label
          class="checkbox-container"
        >同會員資料
          <input
            v-model="isSameAccountInfo"
            type="checkbox"
          >
          <span class="checkbox-checkmark" />
        </label>
      </div>
      <InputEmail
        v-model="recipientEmail"
        class="form-group"
        placeholder="接收電子收據的電子郵件地址"
      />
      <InputName
        v-model="recipientName"
        class="form-group"
        :title="'收件人姓名'"
      />
      <InputMobile
        v-model="recipientMobile"
        class="form-group"
        label="行動電話"
        placeholder="請輸入行動電話"
      />
      <InputAddress
        v-model="recipientAddress"
      />
    </div>
    <!-- Sippment T&C -->
    <div class="col-md-5 ml-auto">
      <h5>運送政策說明：</h5>
      <ul>
        <li>貨品送達時需要簽名。</li>
        <li>標準運送時間為星期一至星期六上午 9 點至下午 6 點。</li>
        <li>一旦商品進入出貨準備程序，將無法更改收件人相關訊。</li>
        <li>貨品僅限於台灣境內運送。</li>
        <li>
          <a
            class="color-red"
            href="https://www.apple.com/tw/shop/help/shipping_delivery"
            target="_blank"
            rel="noopener noreferrer"
          >檢視 Apple 出貨政策</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import InputMobile from './InputMobile'
import InputAddress from './InputAddress'
import InputName from './InputName'
import InputEmail from './InputEmail'
export default {
  name: 'InputGroupPayRecipient',
  // components: { InputAddress, InputMobile, InputName, InputEmail },
  components: { InputAddress, InputMobile, InputName, InputEmail },
  data () {
    return {
      recipientEmail: null,
      recipientName: null,
      recipientMobile: null,
      recipientAddress: {},
      isSameAccountInfo: false
    }
  },
  computed: {
    currentRecipientInfo () {
      return this.$store.getters['cart/currentRecipientInfo']
    }
  },
  watch: {
    isSameAccountInfo () {
      if (!this.isSameAccountInfo) return
      const userInfo = this.$store.getters['member/user']
      this.recipientEmail = userInfo.Email
      this.recipientName = userInfo.Name
      this.recipientMobile = userInfo.Mobile
      this.recipientAddress = {
        city: userInfo.City,
        area: userInfo.Area,
        address: userInfo.Address
      }
    },
    recipientName () {
      this.$store.commit('cart/setRecipientInfo', {
        recipientEmail: this.recipientEmail,
        recipientName: this.recipientName,
        recipientMobile: this.recipientMobile,
        recipientAddress: this.recipientAddress
      })
    },
    recipientMobile () {
      this.$store.commit('cart/setRecipientInfo', {
        recipientEmail: this.recipientEmail,
        recipientName: this.recipientName,
        recipientMobile: this.recipientMobile,
        recipientAddress: this.recipientAddress

      })
    },
    recipientAddress () {
      this.$store.commit('cart/setRecipientInfo', {
        recipientEmail: this.recipientEmail,
        recipientName: this.recipientName,
        recipientMobile: this.recipientMobile,
        recipientAddress: this.recipientAddress
      })
    }
  },
  created () {
    if (Object.keys(this.currentRecipientInfo)) {
      this.recipientEmail = this.currentRecipientInfo.recipientEmail
      this.recipientName = this.currentRecipientInfo.recipientName
      this.recipientMobile = this.currentRecipientInfo.recipientMobile
      this.recipientAddress = this.currentRecipientInfo.recipientAddress
    }
  }
}
</script>
