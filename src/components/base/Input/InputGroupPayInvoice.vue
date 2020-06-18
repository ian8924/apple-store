<template>
  <div class="row customize-content mt-5">
    <div class="col-12 localnav-header">
      <h2>發票</h2>
    </div>
    <div class="col-12">
      <form @submit.prevent>
        <div class="form-inline">
          <label
            v-for="(type, index) in InvoiceType"
            :key="index"
            class="radius-container mr-5"
          >{{ InvoiceTypeName[type] }}
            <input
              v-model="currentView"
              :value="index"
              type="radio"
              name="invoice"
            >
            <span class="radius-checkmark " />
          </label>
        </div>
        <component
          :is="InvoiceType[currentView]"
          class="invoice-type-height"
        />
      </form>
    </div>
  </div>
</template>

<script>
import InputGroupInvoiceElectronic from './InputGroupInvoiceElectronic'
import InputGroupInvoiceDonate from './InputGroupInvoiceDonate'
import InputGroupInvoiceTriplicateUniform from './InputGroupInvoiceTriplicateUniform'

const InvoiceType = [
  'InputGroupInvoiceElectronic',
  'InputGroupInvoiceDonate',
  'InputGroupInvoiceTriplicateUniform'
]
const InvoiceTypeName = {
  InputGroupInvoiceElectronic: '電子發票',
  InputGroupInvoiceDonate: '捐贈發票給：創世基金會',
  InputGroupInvoiceTriplicateUniform: '三聯式發票'
}
const InvoiceTypeCode = ['電子發票', '捐贈', '郵寄']

export default {
  name: 'InputGroupPayInvoice',
  components: {
    InputGroupInvoiceElectronic,
    InputGroupInvoiceDonate,
    InputGroupInvoiceTriplicateUniform
  },
  data () {
    return {
      currentView: 0,
      InvoiceType,
      InvoiceTypeName
    }
  },
  computed: {
    currentInvoiceInfo () {
      return this.$store.getters['cart/currentInvoiceInfo']
    }
  },
  created () {
    if (Object.keys(this.currentInvoiceInfo).length) {
      this.currentView = InvoiceTypeCode.indexOf(this.currentInvoiceInfo.type)
    }
  }
}
</script>

<style>
.invoice-type-height {
  min-height: 430px;
}
</style>
