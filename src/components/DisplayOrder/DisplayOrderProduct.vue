<template>
  <div class="col-12 order-info">
    <p class="h2">
      商品資訊
    </p>
    <div
      v-for="(item, index) in listProductinCart"
      :key="index"
      class="row align-items-center"
    >
      <div class="col-md-2 order-list">
        <img
          :src="item.img"
          class="img-fluid"
          alt=""
        >
      </div>
      <div class="col-md-10 order-list">
        <p class="px-0 pt-0">
          {{ item.summary }}
        </p>
        <div
          v-if="item.engraving.msg1 || item.engraving.msg2"
          class="laser-title-table"
        >
          雷射鐫刻訊息
        </div>
        <div class="laser-content-table">
          <p>{{ item.engraving.msg1 || "" }}</p>
          <p>{{ item.engraving.msg2 || "" }}</p>
        </div>
        <p class="px-0 pt-0">
          數量：{{ item.quantity }}
        </p>
        <span
          v-if="item.step"
          class="rectangle-gold small mt-2"
        >{{ item.step }}</span>
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DisplayOrderProduct',
  props: {
    listProductinCart: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
