<template>
  <div class="col-12 order-info">
    <h2>付款資訊</h2>
    <div class="align-items-center">
      <div
        v-for="(info, index) in paymentInfo_"
        :key="index"
        class="col-12 row align-items-center"
      >
        <div class="col-md-2 order-list">
          <p class="h3 p-0">
            {{ info.type }}
          </p>
        </div>
        <div class="col-md-10  order-list">
          <p class="px-0 pt-0">
            {{ info.val }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const keys = [
  'cardNum',
  'price',
  'discountPrice',
  'selfCost',
  // 'installmentInfo',
  'sendReceiptType'
]
const displayName = [
  '信用卡號',
  '商品總價',
  'Visa卡友專屬折扣',
  '自付金額',
  // '分期',
  '發票資訊'
  // '收件人',
  // '電話'
]

export default {
  name: 'DisplayOrderPayment',
  props: {
    paymentInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    paymentInfo_ () {
      const arr = []
      for (const index in keys) {
        arr.push({
          type: displayName[index],
          val: this.paymentInfo[keys[index]] || ''
        })
      }
      return arr
    }
  }
}
</script>
