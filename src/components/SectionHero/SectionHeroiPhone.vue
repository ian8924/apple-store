<template>
  <div>
    <div
      class="container-fluid item-landing"
      :class="[bgColor, pbModel]"
    >
      <!-- 區塊圖右 -->
      <div
        v-if="heroInfo.styleSection"
        class="row align-items-center"
      >
        <div class="col-md-6">
          <h2 v-if="heroInfo.modelNameSvg">
            <img
              class="img-fluid"
              :src="heroInfo.modelNameSvg"
              :alt="heroInfo.model"
            >
          </h2>
          <h2
            v-if="!heroInfo.modelNameSvg"
            :class="textColorModel"
          >
            iPhone {{ heroInfo.model }}
          </h2>
          <p
            v-if="heroInfo.campaignSubTitle"
            ref="productTitle"
            class="h2 title-medium2"
            :class="[plCampaignSubTitle, textColorModel]"
          >
            {{ heroInfo.campaignSubTitle }}
          </p>
          <ButtonPrimary
            text="立即購買"
            @click="redeemReward(decoratedRoute)"
          />
        </div>
        <div class="col-md-6 text-left">
          <img
            class="img-fluid"
            :src="heroInfo.backgroundURL"
            alt=""
          >
        </div>
      </div>
      <!-- 圖中 -->
      <div
        v-else
        class="row"
      >
        <div class="col-md-12">
          <h2 v-if="heroInfo.modelNameSvg">
            <img
              class="img-fluid"
              :src="heroInfo.modelNameSvg"
              :alt="heroInfo.model"
            >
          </h2>
          <h2
            v-if="!heroInfo.modelNameSvg"
            :class="textColorModel"
          >
            iPhone {{ heroInfo.model }}
          </h2>
          <p
            v-if="heroInfo.campaignSubTitle"
            ref="productTitle"
            class="h2 title-large"
            :class="[plCampaignSubTitle, textColorModel]"
          >
            {{ heroInfo.campaignSubTitle }}
          </p>
          <ButtonPrimary
            text="立即購買"
            @click="redeemReward(decoratedRoute)"
          />
        </div>
        <div class="col-md-12">
          <img
            class="img-fluid"
            :class="wImgHero"
            :src="heroInfo.backgroundURL"
            :alt="heroInfo.model"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>

/*
動態參數
style: background colore、margin bottom、
產品名稱圖片
產品標題
背景圖片、圖片替代文字
*/
const bgAppleColor = {
  '11 Pro': 'bg-black',
  11: 'bg-white',
  XS: 'bg-black',
  XR: 'bg-black',
  8: 'bg-rose',
  SE: 'bg-black-se'
}

const textAppleColor = {
  '11 Pro': 'text-11-pro',
  11: 'text-11',
  XS: 'text-apple-gold',
  XR: 'text-white',
  8: 'text-black',
  SE: 'text-white'
}

export default {
  name: 'SectionHeroiPhone',
  props: { heroInfo: { type: Object, required: true } },
  date: () => {
    return {
      bgColor_: {}
    }
  },
  // 用 computed 微調 layout
  computed: {
    decoratedRoute () {
      const category = this.$store.getters['product/currentProductList']
      return `shop/buy-${category}/${category}-${this.heroInfo.model}`
        .toLowerCase()
        .replace(/\s/g, '-')
    },
    bgColor () {
      if (!bgAppleColor[this.heroInfo.model]) {
        return {}
      }
      const bgColor = {}
      bgColor[bgAppleColor[this.heroInfo.model]] = true
      return bgColor
    },
    plCampaignSubTitle () {
      return {
        'pl-5': this.heroInfo.campaignSubTitle.endsWith('。')
      }
    },
    pbModel () {
      return {
        'pb-0': this.heroInfo.model in { 8: '', '11 Pro': '' }
      }
    },
    textColorModel () {
      return textAppleColor[this.heroInfo.model] || ''
    },
    wImgHero () {
      return {
        'w-50': this.heroInfo.model in { 8: '' }
      }
    }
  },
  methods: {
    // 前往商品頁
    redeemReward (pushRouteName) {
      this.$router.push(`/${this.$i18n.locale}/${pushRouteName}`)
    }
  }
}
</script>
<style >
.text-apple-gold {
  color: #ffe5db;
}
.text-11-pro {
  color: #f5f5f7;
}
.text-11 {
  color: #1d1d1f;
}
</style>
