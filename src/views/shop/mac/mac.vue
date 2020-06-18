<template>
  <div>
    <main>
      <div class="container-fluid item-landing">
        <div class="row justify-content-md-center">
          <div class="col-md-6">
            <p class="note-new">
              全新
            </p>
            <h2 class="title-large">
              MacBook Pro
            </h2>
            <h2>強大。隨行。</h2>
            <ButtonPrimary
              text="立即購買"
              @click="redeemReward(shopRoute[1])"
            />
          </div>
          <div class="col-md-12">
            <img
              class="img-fluid"
              src="@/assets/images/Mac/macbook_pro_13__ep96x983izyq_large.jpg"
              alt=""
            >
          </div>
        </div>
      </div>
      <!-- Macbook Air -->
      <!-- <div class="container-fluid item-landing bg-white">
        <div class="row no-gutters align-items-center my-5">
          <div class="col-lg-6 col-md-12">
            <div class="section-content">
              <p class="note-new">
                全新
              </p>
              <h2>MacBook Air</h2>
              <p class="title-large color-black">
                輕。快。
              </p>
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <img
              class="img-fluid"
              src="../../assets/images/Mac/macbook_air__csdfieli984m_large.jpg"
              alt=""
            >
          </div>
        </div>
      </div> -->
      <!-- iMac -->
      <div class="container-fluid item-landing bg-white">
        <div class="row no-gutters align-items-center my-5">
          <div class="col-lg-6 col-md-12">
            <div class="section-content">
              <h2>iMac</h2>
              <h3 class="title-large pl-5">
                超正，好威。
              </h3>
              <ButtonPrimary
                text="立即購買"
                @click="redeemReward(shopRoute[2])"
              />
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <img
              class="img-fluid"
              src="@/assets/images/Mac/iMac.jpg"
              alt=""
            >
          </div>
        </div>
      </div>
      <!-- iMac Pro -->
      <div class="container-fluid item-landing bg-1a">
        <div class="row no-gutters align-items-center my-5">
          <div class="col-lg-7 col-md-12">
            <img
              class="img-fluid"
              src="@/assets/images/Mac/iMacPro.png"
              alt=""
            >
          </div>
          <div class="col-lg-5 col-md-12">
            <div class="section-content">
              <h2>iMac Pro</h2>
              <p class="title-large color-white pl-5">
                強大，<br>
                <span>大有專業風範。</span>
              </p>
              <ButtonPrimary
                text="立即購買"
                @click="redeemReward(shopRoute[3])"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Mac mini -->
      <div class="container-fluid item-landing bg-black">
        <div class="row justify-content-md-center">
          <div class="col-md-12">
            <img
              class="img-fluid"
              src="@/assets/images/Mac/gallery_server_rack__cg9wz0pq2qhe_large.png"
              alt=""
            >
          </div>
          <div class="col-md-6">
            <h2 class="color-white ">
              Mac mini
            </h2>
            <h2 class="title-large color-white pl-5">
              大改款。
            </h2>
            <ButtonPrimary
              text="立即購買"
              @click="redeemReward(shopRoute[4])"
            />
          </div>
        </div>
      </div>
      <!-- 配件 -->
      <div class="container-fluid item-landing bg-mac-acc">
        <div class="row justify-content-md-center">
          <div class="col-md-6">
            <h2 class="title-large">
              Mac 配件
            </h2>
            <h2>探索各種保護殼、耳機、揚聲器等配件，讓你的 Mac 更有發揮。</h2>
            <ButtonPrimary
              text="立即購買"
              @click="redeemReward('accessories?category=Mac')"
            />
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
import { sectionHerosM } from '@/stores/config/config.mac'

const shopRoute = [
  'MacBook Air',
  'MacBook Pro',
  'iMac',
  'iMac Pro',
  'Mac mini'
].map(name => {
  return `shop/buy-mac/${name}`.toLowerCase().replace(/\s/g, '-')
})

export default {
  name: 'Mac',
  components: { SectionHeroM },
  data: () => {
    return { sectionHerosM, shopRoute }
  },
  computed: {
    sectionHeros () {
      return this.sectionHerosMusic.relatedProductList
    }
  },
  mounted () {
    this.$store.commit('product/setCurrentProductList', 'mac')
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

<style scpoed>
.chapternav-icon {
  width: 48px;
}
.bg-mac-acc {
  height: 600px;
  background-image: url(../../../assets/images/Mac/accessories.png);
  background-size: cover;
}
</style>
