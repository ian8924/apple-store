<template>
  <div>
    <!-- Apple AirPods Pro-->
    <div
      v-if="heroInfo.isFirst"
      class="container-fluid item-landing bg-black"
    >
      <div class="row align-items-center justify-content-end">
        <div class="col-md-12">
          <p class="note-new">
            全新
          </p>
          <h3 class="color-white">
            {{ heroInfo.model }}
          </h3>
          <!--  eslint-disable vue/no-v-html  -->
          <h2
            class="title-medium pl-5"
            v-html="heroInfo.campaignSubTitle"
          >
            {{ heroInfo.campaignSubTitle }}
          </h2>
          <ButtonPrimary
            text="立即購買"
            @click="redeemReward(decoratedRoute)"
          />
        </div>
        <div class="col-md-12">
          <img
            class="img-fluid"
            :src="heroInfo.backgroundURL"
            alt=""
          >
        </div>
      </div>
    </div>
    <!-- Apple AirPods -->
    <div
      v-else
      class="container-fluid item-landing bg-white pb-0"
    >
      <div class="row align-items-center justify-content-end">
        <div class="col-md-6">
          <h3>{{ heroInfo.model }}</h3>
          <!--  eslint-disable vue/no-v-html  -->
          <h2
            class="title-medium pl-5"
            v-html="heroInfo.campaignSubTitle"
          >
            {{ heroInfo.campaignSubTitle }}
          </h2>
          <ButtonPrimary
            text="立即購買"
            @click="redeemReward(decoratedRoute)"
          />
        </div>
        <div class="col-md-6">
          <img
            class="img-fluid"
            :src="heroInfo.backgroundURL"
            alt=""
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionHeroMusic',
  props: { heroInfo: { type: Object, required: true } },
  computed: {
    decoratedRoute () {
      if (Object.prototype.hasOwnProperty.call(this.heroInfo, 'route')) {
        return this.heroInfo.route
      }
      let category
      switch (this.heroInfo.model) {
        case 'iPod touch':
          category = 'music'
          break
        default:
          category = ''
          break
      }
      return `shop/buy-${category}/${this.heroInfo.model}`
        .toLowerCase()
        .replace(/\s/g, '-')
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
