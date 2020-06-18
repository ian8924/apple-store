<template>
  <div class="mt-5">
    <h5>捐贈發票：</h5>
    <ul class="terms">
      <li>捐贈單位：創世基金會。</li>
      <li>
        捐贈發票說明，若您選擇捐贈發票，您的發票買受人將預設為該單位抬頭。
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'InputGroupInvoiceDonate',
  created () {
    this.commitChange()
  },
  activated () {
    this.commitChange()
  },
  methods: {
    commitChange () {
      this.$store.commit('cart/setInvoiceInfo', {
        type: '捐贈',
        invoiceAddress: {},
        invoiceTitle: '',
        invoiceTaxID: ''
      })
    }
  }
}
</script>
