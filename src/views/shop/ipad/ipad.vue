<template>
  <div>
    <main>
      <SectionHero
        v-for="(hero, index) in sectionHeros"
        :key="hero.id"
        :hero-info="hero"
        :index="index"
        :class="{
          'pb-0': heroLength === index + 1
        }"
      />
      <!-- 四小格 -->
      <div class="container-fluid item-landing bg-e6">
        <div class="row">
          <div class="col-md-12">
            <h2 class="title-large pb-100">
              iPad 精彩配件
            </h2>
          </div>
          <div class="col-md-12">
            <div class="row justify-content-md-center align-items-center">
              <!-- 四小格圖下 -->
              <div class="col-5 m-3">
                <div class="row bg-white">
                  <div class="col-md-12 pt-4 four-section-copywriting">
                    <h3>Apple Pencil</h3>
                    <p>全新 Apple Pencil 登場。</p>
                    <ButtonPrimary
                      text="立即購買"
                      @click="redeemReward('accessories?category=iPad&filter=Creativity')"
                    />
                  </div>
                  <div class="col-md-12">
                    <img
                      class="img-fluid w-75"
                      src="@/assets/images/iPad/apple_pencil.jpg"
                      alt=""
                    >
                  </div>
                </div>
              </div>
              <!-- 四小格圖上 -->
              <div class="col-5 m-3">
                <div class="row bg-white">
                  <div class="col-md-12">
                    <img
                      class="img-fluid  w-75"
                      src="@/assets/images/iPad/smart_keyboard.jpg"
                      alt=""
                    >
                  </div>
                  <div class="col-md-12 pt-4 four-section-copywriting">
                    <h3>鍵盤式聰穎雙面夾</h3>
                    <p>全尺寸鍵盤，正面、背面，全面保護。</p>
                    <ButtonPrimary
                      text="立即購買"
                      @click="redeemReward('accessories?category=iPad&filter=Keyboards')"
                    />
                  </div>
                </div>
              </div>
              <!-- 四小格圖下 -->
              <div class="col-5 m-3">
                <div class="row bg-white">
                  <div class="col-md-12 pt-4 four-section-copywriting">
                    <h3>配件</h3>
                    <p>
                      探索各種保護蓋、保護殼及更多配件，協助你將 iPad
                      發揮得<span class="nowrap">淋漓盡致。</span>
                    </p>
                    <ButtonPrimary
                      text="立即購買"
                      @click="redeemReward('accessories?category=iPad')"
                    />
                  </div>
                  <div class=" col-md-12 ">
                    <img
                      class="img-fluid w-75"
                      src="@/assets/images/iPad/accessories__e7jwczo51mky_small.jpg"
                      alt=""
                    >
                  </div>
                </div>
              </div>
              <!-- 四小格圖下 -->
              <div class="col-5 m-3">
                <div class="row bg-white">
                  <div class="col-md-12 pt-4 four-section-copywriting">
                    <h3>AirPods</h3>
                    <p>更加巧妙，無比驚歎。</p>
                    <ButtonPrimary
                      text="立即購買"
                      @click="redeemReward('accessories?category=iPad&filter=Headphones%2BSpeakers')"
                    />
                  </div>
                  <div class=" col-md-12 ">
                    <img
                      class="img-fluid w-75"
                      src="@/assets/images/iPad/airpods.jpg"
                      alt=""
                    >
                  </div>
                </div>
              </div>
              <!-- 四小格圖結束-->
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
  </div>
</template>

<script>
import SectionHeroM from '@/components/SectionHero/SectionHeroM'
import SectionHero from '@/components/SectionHero/SectionHeroiPad'
import {
  sectionHerosM,
  sectionHerosiPad
} from '@/stores/config/config.ipad'

export default {
  name: 'IPad',
  components: { SectionHeroM, SectionHero },
  data: () => {
    return { sectionHerosM, sectionHerosiPad }
  },
  computed: {
    heroLength () {
      return this.sectionHeros.length
    },
    sectionHeros () {
      return this.sectionHerosiPad.relatedProductList
    }
  },
  mounted () {
    this.$store.commit('product/setCurrentProductList', 'ipad')
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

<style >
.nowrap {
  display: inline-block;
  text-decoration: inherit;
  white-space: nowrap;
}
</style>
