<template>
  <div>
    <main>
      <DisplayServerError
        v-if="!summaryShow"
        @click="retry"
      />
      <div
        v-if="summaryShow"
        class="container-fluid bg-white"
      >
        <div class="row customize-content">
          <!-- 產品圖片 -->
          <div class="col-sm-12 col-md-6">
            <ImgSelection />
          </div>
          <!-- 產品選項 -->
          <div class="col-sm-12 col-md-6">
            <div class="customize-p-selection">
              <h2>購買你的 {{ heroName }}</h2>
              <p>現在訂購並獲得免費運送</p>
              <!-- 型號 -->
              <fieldset v-if="Object.keys(availableChoices.model).length > 1">
                <legend class="mt-5">
                  選擇 機型:
                </legend>
                <div class="row selection-content">
                  <ButtonScreenSize
                    v-for="(item, index) in availableChoices.model"
                    :key="index"
                    :text="item"
                  />
                </div>
              </fieldset>
              <!-- 顏色 -->
              <fieldset v-if="Object.keys(availableChoices.finish).length > 1">
                <legend class="mt-5">
                  選擇 外觀:
                </legend>
                <div class="row selection-content">
                  <ButtonFinish
                    v-for="(item, index) in availableChoices.finish"
                    :key="index"
                    :color="item"
                    :text="item"
                  />
                </div>
              </fieldset>
              <!-- 容量 -->
              <fieldset
                v-if="Object.keys(availableChoices.capacity).length > 1"
              >
                <legend class="mt-5">
                  選擇 儲存容量:
                </legend>
                <div class="row selection-content">
                  <ButtonCapacity
                    v-for="(item, index) in availableChoices.capacity"
                    :key="index"
                    :text="item"
                  />
                </div>
              </fieldset>
              <!-- 連線能力 -->
              <fieldset
                v-if="Object.keys(availableChoices.connectivity).length > 1"
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
              <!-- 雷射雕刻 -->
              <fieldset
                v-if="currentEngraving"
              >
                <DisplayEngravingEdit
                  :laser-m-s-g="LaserMSG"
                  @openLaserModal="openLaserModal"
                />
              </fieldset>
              <!-- 摘要 -->
              <fieldset
                v-if="summaryShow"
              >
                <SummarySelection>
                  <p>{{ textSummary }}</p>
                </SummarySelection>
              </fieldset>
              <!-- 金額 -->
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
    <ModalEngraving
      v-if="showLaserModal"
      :laser-m-s-g="LaserMSG"
      :show-modal="showLaserModal"
      :item="itemData"
      :index="1"
      @close="showLaserModal = false"
      @changeLaserMSG="LaserMSG=$event"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ButtonFinish from '@/components/ButtonOption/ButtonOptionFinish'
import ButtonCapacity from '@/components/ButtonOption/ButtonOptionCapacity'
import ButtonScreenSize from '@/components/ButtonOption/ButtonOptionScreenSize'
import ButtonConnectivity from '@/components/ButtonOption/ButtonOptionConnectivity'
import DisplayEngravingEdit from '@/components/ModalEngraving/DisplayEngravingEdit'
import ImgSelection from '@/components/Summary/ImgSelection'
import SummaryPrice from '@/components/Summary/SummaryPrice.vue'
import SummarySelection from '@/components/Summary/SummarySelection.vue'
import ModalEngraving from '@/components/ModalEngraving'
export default {
  name: 'BuyiPad',
  components: {
    ButtonFinish,
    ButtonCapacity,
    ButtonScreenSize,
    ButtonConnectivity,
    DisplayEngravingEdit,
    SummaryPrice,
    SummarySelection,
    ImgSelection,
    ModalEngraving
  },
  data () {
    return {
      showLaserModal: false,
      LaserMSG: { msg1: '', msg2: '' },
      itemData: {
        summary: 'iPad Air 10.5 吋顯示器 64 GB 太空灰 Wi-Fi',
        partNumber: 'MUUJ2TA/A'
      }
    }
  },
  computed: {
    ...mapGetters({
      currentEngraving: 'ipad/currentEngraving',
      availableChoices: 'ipad/availableChoices',
      heroName: 'ipad/currentHero',
      summaryShow: 'ipad/selectionCompleted'
    }),
    textSummary () {
      const objectModel = this.$store.getters['ipad/selectionSummary']
      if (!objectModel) {
        return ''
      }
      const finish = this.$t(`finish.${objectModel.finish}`)
      const model = objectModel.model + ' 吋顯示器'
      const capacity =
        objectModel.capacity < 5
          ? `${objectModel.capacity} TB`
          : `${objectModel.capacity} GB`

      const connectivity =
        this.$t(`connectivity.${objectModel.connectivity}`) || ''
      const summary = `${this.heroName} ${
        model === ' 吋顯示器' ? '' : model
      } ${capacity} ${finish} ${connectivity}`
      this.$store.commit('ipad/setTextSummary', summary)
      return summary
    },
    hasLaserMSG () {
      return this.LaserMSG.msg1 !== ''
    }
  },
  beforeCreate () {
    this.$store.commit('changeSelection', {
      Type: 'ipad',
      product: 'selectModel'
    })
    // 取得當前要顯示的產品項目
    this.$store.dispatch('ipad/getiPadInfo', {
      model: this.$route.params.hero
    })
  },
  destroyed () {
    this.$store.commit('changeSelection', {})
    this.resetState()
  },
  methods: {
    ...mapMutations({
      addProduct: 'cart/addProduct',
      setAvailablePoints: 'cart/setAvailablePoints',
      resetState: 'ipad/resetState'
    }),
    retry () {
      this.$store.dispatch('ipad/getiPadInfo', {
        model: this.$route.params.hero
      })
    },
    openLaserModal () {
      this.itemData = this.$store.getters['ipad/add2CartInfo']
      this.showLaserModal = true
    },
    AddtoCart () {
      const currentSelection = this.$store.getters.currentSelection
      const choosedItem = this.$store.getters[
        `${currentSelection.Type}/add2CartInfo`
      ]
      choosedItem.bonus = {
        points: 0,
        exchangeRate: 0
      }
      // 設定雷射雕刻訊息
      choosedItem.engraving = this.LaserMSG
      // 計算自付金額
      choosedItem.selfPay = choosedItem.price
      this.addProduct(choosedItem)
      this.setAvailablePoints(0)
      // 前往購物車
      this.$router.push({
        path: `/${this.$i18n.locale}/shop/bag`,
        query: { from: this.$route.path }
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    // 取得當前要顯示的產品項目
    this.$store.dispatch('ipad/getiPadInfo', {
      model: to.params.hero
    })
    // this.$store.commit("iphone/setCurreniPhoneModel");
    next()
  },
  beforeRouteEnter (to, from, next) {
    // 防止錯誤參數倒回首頁
    // https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards
    const arr = ['ipad-pro', 'ipad', 'ipad-air', 'ipad-mini']
    if (!arr.includes(to.params.hero.toLowerCase())) {
      next(vm => {
        vm.$router.go(-1)
      })
    }
    next()
  }
}
</script>
