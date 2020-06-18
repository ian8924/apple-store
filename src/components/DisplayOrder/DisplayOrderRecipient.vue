<template>
  <div class="col-12 order-info">
    <h2>寄送資訊</h2>
    <div class="row align-items-center">
      <div
        v-for="(info, index) in recipientInfo_"
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
  // 'orderID',
  'date',
  // 'DeliverEmail',
  'DeliverAddress',
  'DeliverName',
  'DeliverMobile'
]
const displayName = [
  // '訂單編號',
  '訂單日期',
  // '收據信箱',
  '寄送地址',
  '收件者姓名',
  '電話'
]

export default {
  name: 'DisplayOrderRecipient',
  props: {
    recipientInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    recipientInfo_ () {
      const arr = []
      for (const index in keys) {
        arr.push({
          type: displayName[index],
          val: this.recipientInfo[keys[index]] || ''
        })
      }
      return arr
    }
  }
}
</script>
