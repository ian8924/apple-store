<template>
  <div class="col-12">
    <div
      class="row hero-area"
      :class="bannerClass"
    >
      <div class="col-md-6 hero-area-text">
        <img
          v-if="isNike"
          class="img-fluid pt-5"
          src="@/assets/images/Watch/watch-modelheader-nike-logo-201909.png"
          alt=""
        >
        <!--  eslint-disable vue/no-v-html  -->
        <h3 v-html="bannerSlogan">
          {{ bannerSlogan }}
        </h3>
      </div>
      <div class="col-md-6 hero-area-img">
        <img
          class="img-fluid"
          :src="bannerImg"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
const mapBanner = {
  'apple-watch-series-5': require('@/assets/images/Watch/always-on-hero_endframe__8xye5kjzdzma_medium_2x.jpg'),
  'apple-watch-nike': require('@/assets/images/Watch/watch-modelheader-nike-201909.jpeg'),
  'apple-watch-series-3': require('@/assets/images/Watch/watch-modelheader-series3-hero-201809_GEO_TW.jpeg'),
  bands: require('@/assets/images/Watch/apple-watch-shop-bands-hero-201906.jpeg')
}

const mapBgClass = {
  'apple-watch-series-5': 'bg-fa',
  'apple-watch-nike': 'bg-nike',
  'apple-watch-series-3': 'bg-f2',
  bands: 'bg-f2'
}

const mapSlogan = {
  'apple-watch-series-5': '人人都能找到最自己的<br />Apple Watch。',
  'apple-watch-nike': '連結運動，聯繫夥伴。',
  'apple-watch-series-3': '常保活力，常保健康，<br />保持聯繫。',
  bands: '多點新色彩，<br />揮灑新感覺。'
}

export default {
  name: 'DisplayWatchBanner',
  computed: {
    bannerImg () {
      return mapBanner[this.$route.params.hero]
    },
    bannerClass () {
      return [mapBgClass[this.$route.params.hero]]
    },
    bannerSlogan () {
      return mapSlogan[this.$route.params.hero]
    },
    isNike () {
      return this.$route.params.hero.includes('nike')
    }
  }
}
</script>

<style scoped>
.bg-nike h3 {
  color: #fff;
}
</style>
