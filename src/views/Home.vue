<template>
  <main>
    <!-- <div class="container-fluid banner-landing">
      <div class="row banner-content">
        <div class="col-md-12 text-content">
          <h2>{{ $t("home.welcome.msg1") }}<sup>&#174;</sup>商品</h2>
          <p>{{ $t("home.welcome.msg2") }}<sup>&#174;</sup>精選商品！</p>
        </div>
        <div class="col-md-12 banner-img">
          <img
            class="img-fluid"
            src="../assets/images/Home/hero__dvsxv8smkkgi_largetall.jpg"
            alt=""
          >
        </div>
      </div>
    </div> -->
    <div class="container-fluid">
      <div class="row">
        <div
          id="carouselIndicators"
          class="carousel slide"
          data-ride="carousel"
          data-interval="10000"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselIndicators"
              data-slide-to="0"
              class="active"
            />
            <li
              data-target="#carouselIndicators"
              data-slide-to="1"
            />
            <li
              data-target="#carouselIndicators"
              data-slide-to="2"
            />
            <li
              data-target="#carouselIndicators"
              data-slide-to="3"
            />
            <li
              data-target="#carouselIndicators"
              data-slide-to="4"
            />
            <li
              data-target="#carouselIndicators"
              data-slide-to="5"
            />
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item">
              <a
                href="javascript:void(0)"
                target="_blank"
                data-index="3"
                rel="noopener noreferrer"
                @click.prevent="clickSlider"
              >
                <img
                  src="../assets/images/Banner/banner_01.jpg"
                  class="d-block w-100"
                  alt="..."
                >
                <div class="carousel-caption  d-md-block">
                  <h3>全商品支援紅利兌換</h3>
                  <p>輕鬆兌換精選商品，盡情享受美好生活。</p>

                </div>
              </a>
            </div>
            <div class="carousel-item">
              <a
                href="javascript:void(0)"
                target="_blank"
                data-index="0"
                rel="noopener noreferrer"
                @click.prevent="clickSlider"
              >
                <img
                  src="../assets/images/Banner/banner_02.jpg"
                  class="d-block w-100"
                  alt="..."
                >
                <div class="carousel-caption d-md-block">
                  <h3>客製化雷射雕刻</h3>
                  <p>Apple 獨家提供。</p>

                </div>
              </a>
            </div>
            <div class="carousel-item">
              <a
                href="javascript:void(0)"
                target="_blank"
                data-index="1"
                rel="noopener noreferrer"
                @click.prevent="clickSlider"
              >
                <img
                  src="../assets/images/Banner/banner_03.jpg"
                  class="d-block w-100"
                  alt="..."
                >
                <div class="carousel-caption  d-md-block">
                  <h3>保證原廠新品出貨與原廠保固</h3>
                  <p>Apple 品質保證。</p>
                </div>
              </a>
            </div>
            <div class="carousel-item active">
              <a
                href="javascript:void(0)"
                target="_blank"
                data-index="2"
                rel="noopener noreferrer"
                @click.prevent="toVisaTC"
              >
                <img
                  src="../assets/images/Banner/banner_04.jpg"
                  class="d-block w-100"
                  alt="..."
                >
                <div class="carousel-caption  d-md-block">
                  <h3 class="color-white">Visa 海外消費</h3>
                  <p class="color-white">Apple Rewards Store最高折抵 1,000元</p>
                  <p class="banner-link">立即領取 <i class="fas fa-chevron-right" /></p>
                </div>
              </a>
            </div>

            <div class="carousel-item">
              <a
                href="javascript:void(0)"
                target="_blank"
                data-index="4"
                rel="noopener noreferrer"
                @click.prevent="clickSlider"
                @drag.prevent=""
                @dragend.prevent="prevent"
              >
                <img
                  src="../assets/images/Banner/banner_05.jpg"
                  class="d-block w-100"
                  alt="..."
                >
                <div class="carousel-caption  d-md-block">
                  <h3 class="">MacBook Pro</h3>
                  <p class="">最強大， 速配最強者。</p>
                </div>
              </a>
            </div>
            <div class="carousel-item">
              <a
                href="javascript:void(0)"
                target="_blank"
                data-index="5"
                rel="noopener noreferrer"
                @click.prevent="clickSlider"
              >
                <img
                  src="../assets/images/Banner/banner_06.jpg"
                  class="d-block w-100"
                  alt="..."
                >
                <div class="carousel-caption  d-md-block">
                  <h3>最受歡迎 iPad</h3>
                  <p>像電腦，不像任何電腦。</p>
                </div>
              </a>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              class="carousel-control-prev-icon"
              aria-hidden="true"
            />
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselIndicators"
            role="button"
            data-slide="next"
          >
            <span
              class="carousel-control-next-icon"
              aria-hidden="true"
            />
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
    <div class="container-fluid item-landing bg-fa">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-5 col-lg-5 order-sm-12">
          <h2 class="display-2 font-weight-normal">
            Mac
          </h2>
          <ButtonPrimary
            text="立即購買"
            @click="redeemReward('mac')"
          />
        </div>
        <div class="col-md-7 col-lg-7 order-sm-1">
          <img
            class="img-fluid"
            src="../assets/images/Home/MacFamily.png"
            alt
          >
        </div>
      </div>
    </div>

    <div class="container-fluid item-landing bg-white">
      <div class="row justify-content-md-center align-items-center">
        <div class="col-md-6 pb-0 pt-5">
          <img
            class="img-fluid"
            src="../assets/images/Home/iphone_family_bannerImg.png"
            alt
          >
        </div>
        <div class="col-md-6">
          <h2 class="display-4 font-weight-normal">
            購買 iPhone
          </h2>
          <p class="h3">
            為你找到最好的iPhone。
          </p>
          <ButtonPrimary
            text="立即購買"
            @click="redeemReward('iphone')"
          />
        </div>
      </div>
    </div>

    <div class="container-fluid item-landing">
      <div class="row justify-content-md-center align-items-center">
        <div class="offset-md-1 offset-lg-1 col-md-3 col-lg-3">
          <h2 class="display-4 font-weight-normal">
            購買 iPad
          </h2>
          <p class="h3">
            為你找到最好的iPad。
          </p>
          <ButtonPrimary
            text="立即購買"
            @click="redeemReward('ipad')"
          />
        </div>
        <div class="col-md-7 col-lg-7">
          <img
            class="img-fluid"
            src="../assets/images/Home/iPadFamily.png"
            alt
          >
        </div>
      </div>
    </div>

    <div class="container-fluid item-landing pb-0 bg-fa">
      <div class="row">
        <div class="col-md-12">
          <h2>
            <img
              class="img-fluid"
              src="../assets/images/Home/StoreLanding-Watch-Title.png"
              alt
            >
          </h2>
          <p class="h3">
            這樣的錶，出人意表。
          </p>
          <ButtonPrimary
            text="立即購買"
            @click="redeemReward('watch')"
          />
        </div>
        <div class="col-md-12">
          <img
            class="img-fluid align-items-end"
            src="../assets/images/Home/hero__dvsxv8smkkgi_large.jpg"
            alt
          >
        </div>
      </div>
    </div>

    <div class="container-fluid item-landing">
      <div class="row">
        <div class="col-md-12">
          <img
            class="img-fluid"
            src="../assets/images/Home/StoreLanding-TV.png"
            alt
          >
        </div>
        <div class="col-md-12">
          <h2>
            <img
              class="img-fluid"
              src="../assets/images/Home/AppleTV_logo.png"
              alt
            >
          </h2>
          <p class="h3">
            尋找適合你的 Apple TV。
          </p>
          <ButtonPrimary
            text="立即購買"
            @click="redeemReward('tv')"
          />
        </div>
      </div>
    </div>

    <div class="container-fluid item-landing">
      <div class="row justify-content-md-center align-items-center">
        <div class="offset-md-1 offset-lg-1 col-md-3 col-lg-3">
          <h2 class="display-4 font-weight-normal">
            購買 Music
          </h2>
          <ButtonPrimary
            text="立即購買"
            @click="redeemReward('music')"
          />
        </div>
        <div class="col-md-7 col-lg-7">
          <img
            class="img-fluid"
            src="../assets/images/Home/iPodFamily.png"
            alt
          >
        </div>
      </div>
    </div>

    <div class="container-fluid item-landing">
      <div class="row">
        <div class="col-md-12">
          <h2 class="display-4 font-weight-normal">
            配件
          </h2>
          <p class="h3">
            為你找到精選配件
          </p>
          <ButtonPrimary
            text="立即購買"
            @click="redeemReward('accessories')"
          />
        </div>
        <div class="col-md-12">
          <img
            class="img-fluid"
            src="../assets/images/Home/accessoriesFamily.jpg"
            alt
          >
        </div>
      </div>
    </div>
    <!--Mobile -->
    <SectionHeroM
      v-for="line in productLine_"
      :key="line.name"
      :hero-info="line"
    />
  </main>
</template>

<script>
import SectionHeroM from '@/components/SectionHero/SectionHeroM'
import { productLine } from '@/stores/config/config.home'
// eslint-disable-next-line no-unused-vars
const Slides = {}

export default {
  name: 'Home',
  components: {
    SectionHeroM
  },
  data () {
    return {
      slide: {}
    }
  },
  computed: {
    productLine_ () {
      const productLine_ = []
      productLine.forEach(line => {
        line.route = { name: line.name }
        productLine_.push(line)
      })
      return productLine_
    }
  },

  methods: {
    exchangeReward: function (event) {
      this.$router.push(`/${this.$i18n.locale}/${event}`)
    },
    clickSlider (e) {
      this.slide = e.path.filter(el => el.tagName === 'A')
      // console.log('TCL: clickSlider -> this.slide', this.slide[0].dataset.index)
      const anchor = this.slide[0] !== undefined ? this.slide[0].dataset.index : ''
      // console.log('TCL: clickSlider ->  this.slide[0]', this.slide[0].dataset.index)
      // console.log('TCL: clickSlider -> anchor', anchor)
      if (anchor && Slides[anchor]) {
        console.log('clickSlider -> anchor', anchor)
        // window.open(Slides[anchor])
      }
    },
    toVisaTC () {
      this.$router.push(`/${this.$i18n.locale}/visa/tc`)
    },
    // 前往商品頁
    redeemReward (pushRouteName) {
      this.$router.push(`/${this.$i18n.locale}/${pushRouteName}`)
    }
  }
}
</script>
