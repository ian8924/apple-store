<template>
  <li>
    <a
      href=""
      @click.prevent="$emit('click')"
    >
      <div class=" product-item">
        <div class="product-img">
          <img :src="item.IMGLink">
        </div>
        <div class=" product-info-list">
          <div
            v-if="item.model !== 'Bands'"
            class="product-series"
          >
            <!-- <span>{{ $t(`connectivity.${item.connectivity}`) }}</span> -->
          </div>
          <div class="product-link">
            {{ typeName }}
          </div>
          <div class="price-amount">
            NT$ {{ item.price.toLocaleString() }} 起 <span /><sup />
          </div>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: 'ListItemBuyWatch',
  props: {
    item: { type: Object, required: true }
  },
  computed: {
    typeName () {
      if (this.item.bandType) {
        return this.$t(`bandType.${this.item.bandType}`)
      }
      if (this.item.watchType) {
        return this.$t(`watchType.${this.item.watchType}`)
      }
      return this.item.bandType || this.item.watchType
    }
  }
}
</script>
