<template>
  <div
    class="container-fluid item-landing"
    :class="heroInfo.bgStyle"
  >
    <div
      v-if="index % 2 === 0"
      class="row justify-content-md-center align-items-center"
    >
      <!-- 左邊 -->
      <div :class="heroInfo.col.L">
        <p
          v-if="heroInfo.isNew"
          class="note-new"
        >
          全新
        </p>
        <h2 class="title-large">
          {{ heroInfo.model }}
        </h2>
        <!--  eslint-disable vue/no-v-html  -->
        <p
          class="h3 pl-3"
          v-html="heroInfo.campaignSubTitle"
        />
        <ButtonPrimary
          text="立即購買"
          @click="redeemReward(decoratedRoute)"
        />
      </div>
      <!-- 右邊 -->
      <div
        v-if="!heroInfo.bgStyle"
        :class="heroInfo.col.R"
      >
        <img
          class="img-fluid"
          :src="heroInfo.backgroundURL"
          :alt="heroInfo.model"
        >
      </div>
    </div>
    <div
      v-else
      class="row justify-content-md-center align-items-center"
    >
      <div :class="heroInfo.col.L">
        <img
          class="img-fluid"
          :src="heroInfo.backgroundURL"
          :alt="heroInfo.model"
        >
      </div>
      <div
        class="text-left"
        :class="heroInfo.col.R"
      >
        <p
          v-if="heroInfo.isNew"
          class="note-new"
        >
          全新
        </p>
        <h2 class="title-large">
          {{ heroInfo.model }}
        </h2>
        <p class="h3">
          {{ heroInfo.campaignSubTitle }}
        </p>
        <ButtonPrimary
          text="立即購買"
          @click="redeemReward(decoratedRoute)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionHeroiPad',
  props: {
    heroInfo: { type: Object, required: true },
    index: { type: Number, required: true }
  },
  computed: {
    decoratedRoute () {
      const category = this.$store.getters['product/currentProductList']
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

<style >
.h3 {
  color: #333333;
}
</style>
