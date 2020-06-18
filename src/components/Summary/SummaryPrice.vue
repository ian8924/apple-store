<template>
  <div class="selection-bouns">
    <div class="price-amount d-flex align-items-center">
      NT$ {{ stateNeedPoints }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryPrice',
  computed: {
    stateNeedPoints () {
      const needPoints = this.$store.getters[
        `${this.$store.getters.currentSelection.Type}/costPoints`
      ]
      if (!needPoints) {
        return 0
      }
      return needPoints.toLocaleString()
    },
    installmentAvailable () {
      return this.$store.getters[
        `${this.$store.getters.currentSelection.Type}/currentInstallment`
      ] > 1
    }
  }
}
</script>
