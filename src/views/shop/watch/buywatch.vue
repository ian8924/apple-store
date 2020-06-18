<template>
  <div>
    <main>
      <DisplayServerError
        v-if="Object.keys(availableListItem).length === 0"
        @click="retry"
      />
      <div
        v-if="Object.keys(availableListItem).length > 0"
        class="container-fluid bg-white"
      >
        <div class="row customize-content">
          <div class="col-12 localnav-header-title">
            <h2 class="d-inline-block">
              {{ heroName }}
            </h2>
          </div>
          <DisplayWatchBanner v-if="!showSelection" />
          <div
            v-if="!showSelection"
            class="col-12"
          >
            <div class="row">
              <div class="col-12 col-md-12 col-xl-12 product-content">
                <ul>
                  <ListItemBuyWatch
                    v-for="(item, index) in availableListItem"
                    :key="index"
                    :item="item[0]"
                    @click="onCliclVariation(item[0])"
                  />
                </ul>
              </div>
            </div>
          </div>
          <!-- 產品圖片 -->
          <div
            v-if="showSelection"
            class="col-sm-12 col-md-6"
          >
            <ImgSelection />
          </div>
          <!-- 產品選項 -->
          <div
            v-if="showSelection"
            class="col-sm-12 col-md-6"
          >
            <div class="customize-p-selection">
              <h2>購買你的 {{ variationName }}</h2>
              <p>現在訂購並獲得免費運送</p>
              <!-- 顏色 -->
              <fieldset v-if="Object.keys(availableChoices.color).length > 1">
                <legend class="mt-5">
                  選擇 顏色:
                </legend>
                <div class="row selection-content">
                  <ButtonOptionSwatch
                    v-for="(item, index) in availableChoices.color"
                    :key="index"
                    :color="item"
                    :text="item"
                    :swatch="availableChoices.swatch"
                  />
                </div>
              </fieldset>
              <!-- 錶殼尺寸 -->
              <fieldset v-if="Object.keys(availableCase).length > 0">
                <legend class="mt-5">
                  選擇 錶殼尺寸:
                </legend>
                <div class="row selection-content">
                  <ButtonOptionCaseSize
                    v-for="(item, index) in availableCase"
                    :key="index"
                    :text="item"
                  />
                </div>
              </fieldset>
              <!-- 錶帶尺寸 -->
              <fieldset v-if="Object.keys(availableBand).length > 0">
                <legend class="mt-5">
                  選擇 錶帶尺寸:
                </legend>
                <div class="row selection-content">
                  <ButtonOptionBandSize
                    v-for="(item, index) in availableBand"
                    :key="index"
                    :text="item"
                  />
                </div>
              </fieldset>
              <!-- 連線能力 -->
              <fieldset
                v-if="Object.keys(availableChoices.connectivity).length > 0"
              >
                <legend class="mt-5">
                  選擇 連線能力:
                </legend>
                <div class="row selection-content">
                  <ButtonConnectivity
                    v-for="(item, index) in availableChoices.connectivity"
                    :key="index"
                    :text="item"
                  />
                </div>
              </fieldset>
              <!-- 摘要 -->
              <fieldset
                v-if="summaryShow"
              >
                <SummarySelection>
                  <p>{{ textSummary }}</p>
                </SummarySelection>
              </fieldset>
              <!-- 點數兌換 -->
              <SummaryPrice />
              <!-- 加入購物車 -->
              <ButtonPrimary
                :text="'加入購物車'"
                :is-disabled="!summaryShow"
                @click="AddtoCart"
              />
              <p>* 價格包括稅</p>
              <p class="note-icon-shopping">
                出貨最快約
                <span class="font-weight-bold text-dark">4-7 個工作天</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ListItemBuyWatch from '@/components/ListItemProduct/ListItemBuyWatch'
import DisplayWatchBanner from '@/components/ListItemProduct/DisplayWatchBanner'
import ButtonOptionCaseSize from '@/components/ButtonOption/ButtonOptionCaseSize'
import ButtonOptionBandSize from '@/components/ButtonOption/ButtonOptionBandSize'
import ButtonConnectivity from '@/components/ButtonOption/ButtonOptionConnectivity'
import ButtonOptionSwatch from '@/components/ButtonOption/ButtonOptionSwatch'
import ImgSelection from '@/components/Summary/ImgSelection'
import SummaryPrice from '@/components/Summary/SummaryPrice.vue'
import SummarySelection from '@/components/Summary/SummarySelection.vue'

export default {
  name: 'BuyWatch',
  components: {
    ButtonOptionCaseSize,
    ButtonOptionBandSize,
    ButtonConnectivity,
    ButtonOptionSwatch,
    ImgSelection,
    ListItemBuyWatch,
    SummaryPrice,
    SummarySelection,
    DisplayWatchBanner
  },
  data () {
    return {
      LaserMSG: { msg1: '', msg2: '' },
      showSelection: false
    }
  },
  computed: {
    ...mapGetters({
      availableChoices: 'watch/availableChoices',
      availableListItem: 'watch/currentListItemBands',
      currentColor: 'watch/currentColor',
      heroName: 'watch/currentHero',
      summaryShow: 'watch/selectionCompleted',
      textSummary: 'watch/currentSummary'
    }),
    availableBand () {
      const mapBandCase = this.$store.getters['watch/currentMapBandCase']
      const currentCaseSize = this.$store.getters['watch/currentCaseSize']
      // const currentBandSize = this.$store.getters["watch/currentBandSize"];

      const bands = []
      for (const item of mapBandCase) {
        if (item.caseSize === currentCaseSize && item.bandSize) {
          bands.push(item.bandSize)
        }
      }
      return bands
    },
    availableCase () {
      const mapBandCase = this.$store.getters['watch/currentMapBandCase']
      const currentBandSize = this.$store.getters['watch/currentBandSize']
      // const currentCaseSize = this.$store.getters["watch/currentCaseSize"];

      const cases = []
      for (const item of mapBandCase) {
        if (item.bandSize === currentBandSize && item.caseSize) {
          cases.push(item.caseSize)
        }
      }
      return cases.length > 0 ? cases : this.availableChoices.caseSize
    },
    variationName () {
      const name = this.$store.getters['watch/currentBandType'] || ''
      if (!name) return ''
      let translate = this.$t(`bandType.${name}`)
      if (!translate.includes('bandType.')) {
        return translate
      }
      translate = this.$t(`watchType.${name}`)
      if (!translate.includes('watchType.')) {
        return translate
      }
      return ''
    }
  },
  destroyed () {
    this.$store.commit('changeSelection', {})
    this.resetState()
  },
  beforeCreate () {
    this.$store.commit('changeSelection', {
      Type: 'watch',
      product: 'selectModel'
    })
    // 取得當前要顯示的產品項目
    this.$store.dispatch('watch/getWatchInfo', {
      model: this.$route.params.hero
    })
  },
  methods: {
    ...mapMutations({
      addProduct: 'cart/addProduct',
      setAvailablePoints: 'cart/setAvailablePoints',
      resetState: 'watch/resetState'
    }),
    onCliclVariation (event) {
      if (event.model === 'Bands') {
        this.$store.commit('watch/selectBandType', event.bandType)
      } else {
        this.$store.commit('watch/selectWatchType', event.watchType)
      }
      this.showSelection = true
      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: { type: event.bandType || event.watchType }
      })

      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    },
    retry () {
      this.$store.dispatch('watch/getWatchInfo', {
        model: this.$route.params.hero
      })
    },
    AddtoCart () {
      const currentSelection = this.$store.getters.currentSelection
      const choosedItem = this.$store.getters[
        `${currentSelection.Type}/add2CartInfo`
      ]
      // asign 選擇物品的點數預設兌換值
      choosedItem.bonus = {
        points: 0,
        exchangeRate: 0
      }
      choosedItem.engraving = this.LaserMSG
      // 計算自付金額
      choosedItem.selfPay = choosedItem.price
      this.addProduct(choosedItem)
      this.setAvailablePoints(0)

      this.$router.push({
        path: `/${this.$i18n.locale}/shop/bag`,
        query: { from: this.$route.path }
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.params.hero !== from.params.hero) {
      this.showSelection = false
      this.$store.commit('watch/resetState')
      // 取得當前要顯示的產品項目
      this.$store.dispatch('watch/getWatchInfo', {
        model: to.params.hero
      })
    }
    if (!to.query.type) {
      this.showSelection = false
    }
    next()
  }
}
</script>
