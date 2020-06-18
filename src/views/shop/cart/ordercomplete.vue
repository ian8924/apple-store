<template>
  <main>
    <DisplayOrderTransaction
      v-if="showTransition"
      :order-serial="orderSerial"
    />
  </main>
</template>

<script>
import DisplayOrderTransaction from '@/components/DisplayOrder/DisplayOrderTransaction'

export default {
  name: 'OrderComplete',
  components: { DisplayOrderTransaction },
  computed: {
    showTransition () {
      return this.$store.getters['cart/showTransition']
    },
    orderSerial () {
      return this.$store.getters['cart/currentOrder'].orderID || ''
    }
  },
  beforeMount () {
    if (!this.showTransition) {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
