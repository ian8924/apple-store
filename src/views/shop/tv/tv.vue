<template>
  <main>
    <!-- AppleTV 4K -->
    <div class="container-fluid item-landing bg-black">
      <div class="row justify-content-md-center ">
        <div class="col-md-12 my-3">
          <h2>
            <img
              class="img-fluid"
              src="@/assets/images/TV/apple_tv_4k_logo__ezeq152chmaa_large.png"
              alt=""
            >
          </h2>
          <h3 class="mb-4 color-white">
            Apple TV 4K 帶來最引人入勝的 Apple TV 體驗。<br>透過 4K HDR
            和杜比全景聲，盡情享受影院級饗宴。
          </h3>
          <ButtonPrimary
            text="立即購買"
            @click="redeemReward(shopRoute[0])"
          />
        </div>
        <div class="col-md-12">
          <img
            class="img-fluid"
            src="@/assets/images/TV/apple_tv_4k_remote__nuhoyzf08qaq_large.png"
            alt=""
          >
        </div>
      </div>
    </div>
    <!-- AppleTV HD -->
    <div class="container-fluid item-landing bg-white">
      <div class="row my-5">
        <div class="col-lg-6 col-md-12 align-self-center">
          <div>
            <h2 class="title-large">
              Apple TV HD
            </h2>
            <h3>
              無論是電視節目和電影，還是數以千計的遊戲和 app，Apple TV
              一應俱全。
            </h3>
            <ButtonPrimary
              text="立即購買"
              @click="redeemReward(shopRoute[1])"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-12">
          <img
            class="img-fluid"
            src="@/assets/images/TV/apple-tv-hero-select-201510.jpeg"
            alt=""
          >
        </div>
      </div>
    </div>
    <!-- AppleTV 配件 -->
    <div class="container-fluid item-landing bg-f2">
      <div class="row justify-content-md-center">
        <div class="col-md-12">
          <h2 class="title-large pb-100">
            Apple TV 精選配件
          </h2>
        </div>
        <div class="col-lg-3 bg-white mx-4 my-4">
          <img
            class="img-fluid"
            src="@/assets/images/TV/MV7N2.jpg"
          >
          <div>
            <h4>AirPods</h4>
            <ButtonPrimary
              text="立即購買"
              @click="redeemReward('accessories?category=iphone&filter=Health%2BFitness')"
            />
          </div>
        </div>
        <div class="col-lg-3 bg-white mx-4 my-4">
          <img
            class="img-fluid"
            src="@/assets/images/TV/MLFQ2.jpg"
          >
          <div>
            <h4>Remote Loop</h4>
            <ButtonPrimary
              text="立即購買"
              @click="redeemReward('accessories?category=Apple%20TV&filter=Remotes%20%26%20Controllers')"
            />
          </div>
        </div>
        <div class="col-lg-3 bg-white mx-4 my-4">
          <img
            class="img-fluid"
            src="@/assets/images/TV/MQGE2.jpeg"
          >
          <div>
            <h4>Apple TV Remote</h4>
            <ButtonPrimary
              text="立即購買"
              @click="redeemReward('accessories?category=Apple%20TV&filter=Remotes%20%26%20Controllers')"
            />
          </div>
        </div>
      </div>
    </div>
    <!--Mobile -->
    <SectionHeroM
      v-for="prod in sectionHerosM"
      :key="prod.id"
      :hero-info="prod"
    />
  </main>
</template>

<script>
import SectionHeroM from '@/components/SectionHero/SectionHeroM'
import { sectionHerosM } from '@/stores/config/config.tv'

const shopRoute = ['Apple TV 4K', 'Apple TV HD'].map(name => {
  return `shop/buy-tv/${name}`.toLowerCase().replace(/\s/g, '-')
})

export default {
  name: 'TV',
  components: { SectionHeroM },
  data () {
    return {
      sectionHerosM,
      shopRoute
    }
  },
  mounted () {
    this.$store.commit('product/setCurrentProductList', 'tv')
  },
  beforeDestroy () {
    this.$store.commit('product/setCurrentProductList', '')
  },
  methods: {
    // 前往商品頁
    redeemReward (pushRouteName) {
      this.$router.push(`/${this.$i18n.locale}/${pushRouteName}`)
    }
  }
}
</script>
