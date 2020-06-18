<template>
  <div class="mt-5">
    <h5>電子發票：</h5>
    <ul class="terms">
      <li>核准文號: 中區國稅民權三字第1000004593號。</li>
      <li>
        電子發票:
        本網站主要提供電子發票，將於奇數月26日根據國稅局公佈之統一發票中獎號碼進行電腦對獎(已索取/已捐贈/已作廢發票除外)，若有中獎我們將於當月底發出簡訊通知，並以掛號方式把中獎發票寄給您。
      </li>
      <li>
        選擇開立電子發票，即表示本人同意訂單取消或金額調整，由「肯驛國際」代為處理銷售憑證(例如：營業人銷貨退回進貨退出或折讓證明單)，以加速辦理退款作業，如有問題請致電肯驛國際客服專線 04-2206-3036 洽詢。
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'InputGroupInvoiceElectronic',
  activated () {
    this.commitChange()
  },
  methods: {
    commitChange () {
      const payload = {
        type: '電子發票',
        invoiceTitle: '',
        invoiceTaxID: '',
        invoiceAddress: {}
      }
      this.$store.commit('cart/setInvoiceInfo', payload)
    }
  }
}
</script>
