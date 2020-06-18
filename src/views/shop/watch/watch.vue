<template>
  <div>
    <main>
      <!-- Apple Watch Series4 -->
      <div class="container-fluid item-landing pt-0 pb-0">
        <div class="row ">
          <div class="col-md-12">
            <img
              class="img-fluid"
              src="@/assets/images/Watch/hero__e85lhpfa8n2i_large.jpg"
              alt=""
            >
          </div>
          <div class="col-md-12 my-5">
            <h2 class="mb-3">
              <img
                class="img-fluid"
                src="@/assets/images/Watch/logo_hero__trsrpeu6koqy_large.png"
                alt=""
              >
            </h2>
            <h3 class="pl-4">
              這樣的錶，出人意表。
            </h3>
            <ButtonPrimary
              text="立即購買"
              @click="redeemReward(shopRoute[0])"
            />
          </div>
        </div>
      </div>
      <!-- 四格圖 -->
      <div class="container-fluid item-landing bg-e6">
        <div class="row">
          <div class="col-md-12">
            <div class="row justify-content-md-center align-items-center">
              <!-- 四小格圖下 -->
              <div class="col-5 m-3">
                <div class="row bg-watch-nike">
                  <div class="col-md-12 pt-4 four-section-copywriting">
                    <h3>
                      <img
                        class="img-fluid"
                        src="@/assets/images/Watch/nike_series5_logo__bjry86m1qes2_large.png"
                        alt=""
                      >
                    </h3>
                    <p class="pl-3 color-white">
                      連結運動，聯繫夥伴。
                    </p>
                    <ButtonPrimary
                      text="立即購買"
                      @click="redeemReward(shopRoute[1])"
                    />
                  </div>
                  <div class="col-md-12 pl-0 pr-0">
                    <img
                      class="img-fluid w-100"
                      src="@/assets/images/Watch/apple_watch_series5_nike_tile__c3ehrd31hewm_large.jpg"
                      alt=""
                    >
                  </div>
                </div>
              </div>
              <!-- 四小格圖下 -->
              <div class="col-5 m-3">
                <div class="row bg-white">
                  <div class="col-md-12 pt-4 four-section-copywriting">
                    <h3>
                      <img
                        class="img-fluid"
                        src="@/assets/images/Watch/light_logo_series_3__efo7v10ece4i_large.jpg"
                        alt=""
                      >
                    </h3>
                    <p class="pl-3">
                      常保活力，保持聯繫。
                    </p>
                    <ButtonPrimary
                      text="立即購買"
                      @click="redeemReward(shopRoute[2])"
                    />
                  </div>
                  <div class="col-md-12 pl-0 pr-0">
                    <img
                      class="img-fluid w-100"
                      src="@/assets/images/Watch/three_rings_large.jpg"
                      alt=""
                    >
                  </div>
                </div>
              </div>
              <!-- 四小格圖下 -->
              <div class="col-5 m-3">
                <div class="row bg-white">
                  <div class="col-md-12 pt-4 four-section-copywriting">
                    <h3>配件</h3>
                    <p class="pl-3">
                      精選 Watch 配件。
                    </p>
                    <ButtonPrimary
                      text="立即購買"
                      @click="redeemReward('accessories?category=Watch')"
                    />
                  </div>
                  <div class=" col-md-12 ">
                    <img
                      class="img-fluid w-75"
                      src="@/assets/images/Watch/MU9F2_GEO_TW02.png"
                      alt=""
                    >
                  </div>
                </div>
              </div>
              <!-- 四小格圖下 -->
              <div class="col-5 m-3">
                <div class="row bg-white">
                  <div class="col-md-12 pt-4 four-section-copywriting">
                    <h3>錶帶</h3>
                    <p class="pl-3">
                      多點新色彩，揮灑新感覺。
                    </p>
                    <ButtonPrimary
                      text="立即購買"
                      @click="redeemReward('shop/buy-watch/bands')"
                    />
                  </div>
                  <div class=" col-md-12 ">
                    <img
                      class="img-fluid w-75"
                      src="@/assets/images/Watch/bg-watch-acc.jpg"
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
import { sectionHerosM } from '@/stores/config/config.watch'

const shopRoute = [
  'Apple Watch Series 5',
  'Apple Watch Nike',
  'Apple Watch Series 3'
].map(name => {
  return `shop/buy-watch/${name}`.toLowerCase().replace(/\s/g, '-')
})

/*
錶帶分類：
運動型錶帶
運動型錶環
Nike 運動型錶帶
Nike 運動型錶環
皮革
不鏽鋼

機型分類：
Series 4
Nike+
Series 3

Series 5分類：
  機殼材質(2)
    鋁
    不鏽鋼
    陶瓷
    鈦
  錶帶或錶環(2)
  顏色(3)
    白色
    粉色(鋁)
    金色(不鏽鋼)
    黑色

  內選清單
    長度
    連線能力(不鏽鋼都是 GPS+行動網路))

Nike+分類：
  機殼顏色+錶帶 共 8 種
內選清單：
  長度
  網路連線能力

不分類：
顏色
連線方式
*/

export default {
  name: 'Watch',
  components: { SectionHeroM },
  data: () => {
    return { sectionHerosM, shopRoute }
  },
  mounted () {
    this.$store.commit('product/setCurrentProductList', 'watch')
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
