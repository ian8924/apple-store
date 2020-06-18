<template>
  <div class="row cart-list-mobile">
    <div class="col-4">
      <div>
        <a><img
          class="img-fluid"
          :src="info.img"
          alt=""
          @click.prevent
        ></a>
      </div>
    </div>
    <div class="col-8 cart-list-m-detail">
      <h6>{{ info.summary }}</h6>
      <div
        v-if="hasEngraving"
        class="laser-title-table"
      >
        雷射鐫刻訊息
      </div>
      <div class="laser-content-table">
        <p>{{ info.engraving.msg1 || "" }}</p>
        <p>{{ info.engraving.msg2 || "" }}</p>
      </div>
      <p>NT$ {{ localePrice }}</p>
      <p>數量：{{ info.quantity }}</p>
      <button
        v-if="editable"
        class="color-red"
        @click="editPayment"
      >
        刪除
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileListItemCart',
  props: {
    info: { type: Object, required: true },
    editable: { type: Boolean, default: true }
  },
  computed: {
    localePrice () {
      return this.info.price.toLocaleString()
    },
    localePoints () {
      return this.info.bonus.points.toLocaleString()
    },

    engraving () {
      return this.info.engraving || {}
    },
    hasEngraving () {
      const msg1 = this.engraving.msg1 || ''
      const msg2 = this.engraving.msg2 || ''
      return msg1 !== '' || msg2 !== ''
    }
  },
  methods: {
    editPayment () {
      this.$emit('click', this.$attrs.index)
    }
  }
}
</script>
