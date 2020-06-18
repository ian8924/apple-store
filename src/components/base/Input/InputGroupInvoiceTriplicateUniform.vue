<template>
  <div class="mt-5">
    <h5>三聯式發票：</h5>
    <p>依財政部令本副本僅供查核，不可直接兌獎。</p>
    <div class="form-group">
      <label for="InvoiceTitle">公司抬頭</label>
      <ValidationProvider
        v-slot="{ errors }"
        name="InvoiceTitle"
        rules="required"
      >
        <input
          id="InvoiceTitle"
          v-model="invoiceTitle"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors[0] }"
          placeholder="請輸入公司抬頭"
        >
        <div
          v-show="errors[0] "
          class=" invalid-feedback"
        >
          {{ errors[0] }}
        </div>
      </ValidationProvider>
    </div>
    <div class="form-group">
      <label for="Invoice">發票統編</label>
      <ValidationProvider
        v-slot="{ errors }"
        name="InvoiceTitle"
        rules="required|min:8"
      >
        <input
          v-model="invoiceTaxID"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors[0] }"
          maxlength="8"
          placeholder="請輸入發票統編"
        >
        <div
          v-show="errors[0]"
          class=" invalid-feedback"
        >
          {{ errors[0] }}
        </div>
      </ValidationProvider>
    </div>
    <h5 class="d-block mb-2">
      寄送發票地址
    </h5>
    <div class="mb-2">
      <label
        class="checkbox-container"
      >同運送地址
        <input
          v-model="isSameReciepInfo"
          type="checkbox"
        >
        <span class="checkbox-checkmark" />
      </label>
    </div>
    <InputAddress
      v-model="invoiceAddress"
    />
  </div>
</template>

<script>
import InputAddress from './InputAddress'

export default {
  name: 'InputGroupInvoiceTriplicateUniform',
  components: {
    InputAddress
  },
  data () {
    return {
      invoiceAddress: {},
      invoiceTitle: '',
      invoiceTaxID: '',
      isSameReciepInfo: false
    }
  },
  computed: {
    recipientAddress () {
      return this.$store.getters['cart/currentRecipientInfo'].recipientAddress
    },
    currentInvoiceInfo () {
      return this.$store.getters['cart/currentInvoiceInfo']
    }
  },
  watch: {
    isSameReciepInfo () {
      if (!this.isSameReciepInfo || !this.recipientAddress) return
      this.invoiceAddress = {
        city: this.recipientAddress.city,
        area: this.recipientAddress.area,
        address: this.recipientAddress.address
      }
    }
  },
  created () {
    this.invoiceAddress = this.currentInvoiceInfo.invoiceAddress || {
      city: '',
      area: '',
      address: ''
    }
    this.invoiceTitle = this.currentInvoiceInfo.invoiceTitle || ''
    this.invoiceTaxID = this.currentInvoiceInfo.invoiceTaxID || ''
    this.$watch(
      vm => [vm.invoiceTitle, vm.invoiceTaxID, vm.invoiceAddress],
      () => {
        this.commitChange()
      },
      { deep: false }
    )
  },
  mounted () {
    this.commitChange()
  },
  methods: {
    commitChange () {
      let payload = {
        type: '郵寄',
        invoiceAddress: this.invoiceAddress,
        invoiceTitle: this.invoiceTitle,
        invoiceTaxID: this.invoiceTaxID
      }
      if (!this.invoiceTitle || !this.invoiceTaxID) {
        payload = {}
      }
      for (const key in this.invoiceAddress) {
        if (!this.invoiceAddress[key]) {
          payload = {}
          break
        }
      }
      this.$store.commit('cart/setInvoiceInfo', payload)
    }
  }
}
</script>
