<template>
  <div class="row cart-list-mobile">
    <div class="col-12">
      <table class="w-100">
        <tbody>
          <tr class="text-right">
            <td colspan="6">
              <p>購物車小計</p>
            </td>
            <td>
              <p class="text-nowrap">
                NT$ {{ subTotalPrice }}
              </p>
            </td>
          </tr>
          <tr
            v-if="showVisaDiscount"
            class="text-right"
          >
            <td
              colspan="6"
              class="border-0"
            >
              <p class="color-light-red">
                Visa卡友專屬折扣
              </p>
            </td>
            <td class="border-0">
              <p class="color-light-red text-nowrap">
                NT$ {{ visaDiscountInfo }}
              </p>
            </td>
          </tr>
          <tr class="text-right">
            <td
              colspan="6"
              class="border-0"
            >
              <p class="color-light-red">
                運費
              </p>
            </td>
            <td class="border-0">
              <p class="color-light-red text-nowrap">
                免運
              </p>
            </td>
          </tr>
          <tr class="text-right">
            <td colspan="6">
              <p class="total">
                自付總金額
              </p>
              <!-- <p>含加值型營業稅</p> -->
            </td>
            <td>
              <p class="text-nowrap total color-red">
                NT$ {{ totalPrice }}
              </p>
              <!-- <p class="text-nowrap">約 NT$3,108</p> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileCartTotal',
  props: {
    showVisaDiscount: { type: Boolean, required: true },
    visaDiscountInfo: { type: Number, required: true }
  },
  computed: {
    totalPrice () {
      return (this.$store.getters['cart/totalPrice'] - this.visaDiscountInfo).toLocaleString()
    },
    subTotalPrice () {
      return this.$store.getters['cart/totalPrice'].toLocaleString()
    }
  }
}
</script>
