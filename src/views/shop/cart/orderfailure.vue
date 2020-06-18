
<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 p-0 mb-5">
          <div class="banner-header-fail" />
          <div class="card-info-content">
            <i class="fas fa-times-circle color-primary display-4 mb-3" />
            <h2>交易失敗</h2>
            <h5 class="mb-4">
              {{ checkoutErrorMessage }}
            </h5>
            <button
              type="button"
              class="btn-outline-red mb-3"
              @click="goPayment"
            >
              {{ displayMessage }}
            </button>
            <ol
              v-if="isPaybyBonus"
              class="small bonus-note"
            >
              <span>點數餘額查詢方式</span>
              <li>
                <a
                  href="https://internet-banking.dbs.com.tw/cardplus/#/"
                  target="_blank"
                >1.前往 "DBS Card+" App 查詢
                </a>
              </li>
              <li>2.最近一筆信用卡帳單</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'OrderFailure',
  computed: {
    isPaybyBonus () {
      const items = this.$store.getters['cart/listProductinCart']
      const [item] = items
      if (item !== undefined) {
        return item.bonus.points > 0
      }
      return false
    },
    displayMessage () {
      return this.isPaybyBonus ? '重新調整兌換點數' : '重新設定付款資訊'
    },
    // 起單失敗錯誤訊息顯示
    checkoutErrorMessage () {
      let checkoutErrorMessage = ''
      switch (this.$store.state.cart.checkoutErrorMessage) {
        case 'Order format error':
          checkoutErrorMessage = '輸入資料格式錯誤'
          break
        case 'check interest Fail':
          checkoutErrorMessage = '優惠資格不符(已使用)'
          break
        case 'Insert EIP order Error':
          checkoutErrorMessage = '起單失敗'
          break
        default:
          checkoutErrorMessage = this.$store.state.cart.checkoutErrorMessage
          break
      }
      return checkoutErrorMessage
    }
  },
  methods: {
    goPayment () {
      this.$router.push({ name: 'payment' })
    }
  }
}
</script>
