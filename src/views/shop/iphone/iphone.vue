<template>
  <div>
    <main>
      <SectionHero
        v-for="(hero, index) in sectionHeros"
        :key="index"
        :hero-info="hero"
      />
      <div class="container-fluid item-landing bg-f2 pb-0 mb-5">
        <div class="row justify-content-md-center align-items-center">
          <div class="offset-md-1 offset-lg-1 col-md-3 col-lg-3">
            <h2 class="display-3 font-weight-normal">
              配件
            </h2>
            <p class="h3">
              探索各種保護殼、耳機、揚聲器及更多配件。
            </p>
            <ButtonPrimary
              text="立即購買"
              @click="redeemReward('accessories?category=iPhone')"
            />
          </div>
          <div class="col-md-7 col-lg-7">
            <img
              class="img-fluid"
              src="@/assets/images/iPhone/iPhoneAccessories.png"
              alt
            >
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
import SectionHero from '@/components/SectionHero/SectionHeroiPhone'
import {
  sectionHerosM,
  sectionHerosiPhone
} from '@/stores/config/config.iphone'

export default {
  name: 'IPhone',
  components: { SectionHeroM, SectionHero },
  data: () => {
    return { sectionHerosM, sectionHerosiPhone }
  },
  computed: {
    sectionHeros () {
      return this.sectionHerosiPhone.relatedProductList
    }
  },
  mounted () {
    this.$store.commit('product/setCurrentProductList', 'iphone')
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
