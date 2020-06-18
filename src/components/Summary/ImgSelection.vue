<template>
  <!-- 讓圖片在捲動時可以黏住 -->
  <!-- https://stackoverflow.com/questions/48884257/make-position-fixed-behavior-like-sticky-for-vue2 -->
  <div class="customize-p-image sticky-top">
    <img
      v-if="getState"
      ref="productImg"
      :key="getState"
      class="img-fluid"
      :src="getState"
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: 'ImgSelection',
  // props: { src: { type: String, required: true } },
  data: () => {
    return { curSrc: '' }
  },
  computed: {
    getState () {
      // this.$refs.productImg.src = "";
      const picSrc = this.$store.getters[
        `${this.$store.getters.currentSelection.Type}/currentPic`
      ]
      if (!picSrc) {
        return ''
      }
      return picSrc
    }
  },
  watch: {
    curSrc () {
      // this.$refs.productImg.src = "";
      const picSrc = this.$store.getters[
        `${this.$store.getters.currentSelection.Type}/currentPic`
      ]
      if (!picSrc) {
        return ''
      }
      return picSrc
    }
  },
  beforeUpdate () {
    // 讓圖片更新下載時，清空目前圖片
    // this.$refs.productImg.src = ''
  }
}
</script>
