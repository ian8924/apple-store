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
                  <ButtonModel
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
              <!-- 雷射雕刻 -->
              <fieldset
                v-if="currentEngraving"
              >
                <div
                  v-if="!hasLaserMSG"
                  class="line mb-5"
                >
                  <DisplayEngravingEdit
                    :laser-m-s-g="LaserMSG"
                    @openLaserModal="openLaserModal"
                  />
                </div>
                <div
                  v-else
                  class="line mb-5"
                >
                  <div class="laser-title">
                    你的雷射鐫刻訊息
                    <a
                      href="#"
                      @click="openLaserModal"
                    >編輯</a>
                  </div>
                  <div class="laser-content">
                    <p>{{ LaserMSG.msg1 }} </p>
                    <p>{{ LaserMSG.msg2 }}</p>
                  </div>
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
      <!-- 產品資訊 -->
      <!-- 暫時不需要顯示 -->
      <!--
      <div class="container-fluid border-top">
        <div class="row customize-content mt-5 mb-5">
          <div class="col-12">
            <h3 class="mb-4">產品資訊</h3>
            <div>
              <h4 class="product-info border-bottom">製造商資訊</h4>
              <div class="product-info-list">
                <h4>部件編號</h4>
                <p>
                  製造商 部件編號: MT9K2TA/A<br />通用商品條碼（UPC）或歐洲商品條碼（EAN）號碼:
                  190198792716
                </p>
              </div>
              <div class="product-info-list">
                <h4>保固</h4>
                <p>
                  iPhone 隨附 90 天的免費技術支援。此外，你的
                  iPhone、充電式電池及所有隨附配件，於購買日期起一年內若出現瑕疵，均在有限的硬體保固範圍之內。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
       -->
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
import ButtonModel from '@/components/ButtonOption/ButtonOptionModel'
import DisplayEngravingEdit from '@/components/ModalEngraving/DisplayEngravingEdit'
import ImgSelection from '@/components/Summary/ImgSelection'
import SummaryPrice from '@/components/Summary/SummaryPrice.vue'
import SummarySelection from '@/components/Summary/SummarySelection.vue'
import ModalEngraving from '@/components/ModalEngraving'
export default {
  name: 'BuyiPodtouch',
  components: {
    ButtonFinish,
    ButtonCapacity,
    ButtonModel,
    DisplayEngravingEdit,
    ImgSelection,
    ModalEngraving,
    SummaryPrice,
    SummarySelection
  },
  data () {
    return {
      showLaserModal: false,
      LaserMSG: { msg1: '', msg2: '' },
      itemData: {
        summary: '',
        partNumber: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      availableChoices: 'music/availableChoices',
      currentEngraving: 'music/currentEngraving',
      heroName: 'music/currentHero',
      summaryShow: 'music/selectionCompleted'
    }),
    textSummary () {
      const objectModel = this.$store.getters['music/selectionSummary']
      if (!objectModel) {
        return ''
      }
      const finish = this.$t(`finish.${objectModel.finish}`)
      const summary = `${objectModel.model} ${objectModel.capacity} GB ${finish}`
      this.$store.commit('music/setTextSummary', summary)
      return summary
    },
    hasLaserMSG () {
      return this.LaserMSG.msg1 !== ''
    }
  },
  beforeCreate () {
    this.$store.commit('changeSelection', {
      Type: 'music',
      product: 'selectModel'
    })
    // 取得當前要顯示的產品項目
    this.$store.dispatch('music/getiPodInfo', {
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
      changeSelection: 'changeSelection',
      resetState: 'music/resetState'
    }),
    retry () {
      this.$store.dispatch('ipad/getiPadInfo', {
        model: this.$route.params.hero
      })
    },
    openLaserModal () {
      this.itemData = this.$store.getters['music/add2CartInfo']
      this.showLaserModal = true
    },
    AddtoCart () {
      // this.$store.state.cart.showModal = true
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
    // 取得當前要顯示的產品項目
    this.$store.dispatch('music/getiPodInfo', {
      model: to.params.hero
    })
    next()
  },
  beforeRouteEnter (to, from, next) {
    // 防止錯誤參數倒回首頁
    // https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards
    /*
      The beforeRouteEnter guard does NOT have access to this, because the guard is called before the navigation is confirmed, thus the new entering component has not even been created yet.
      However, you can access the instance by passing a callback to next. The callback will be called when the navigation is confirmed, and the component instance will be passed to the callback as the argument:
    */
    const arr = ['ipod-touch']
    if (!arr.includes(to.params.hero.toLowerCase())) {
      next(vm => {
        vm.$router.go(-1)
      })
    }
    next()
  }
}
</script>
