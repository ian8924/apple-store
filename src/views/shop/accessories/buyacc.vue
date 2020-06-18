<template>
  <div>
    <main>
      <div class="container-fluid bg-white">
        <div class="row customize-content">
          <!-- 產品圖片 -->
          <div class="col-sm-12 col-md-6">
            <ImgSelection />
          </div>
          <!-- 產品選項 -->
          <div class="col-sm-12 col-md-6">
            <div class="customize-p-selection">
              <h2>購買你的 {{ heroName }}</h2>
              <DropdownOptionLang
                v-if="Object.keys(availableChoices.inputType).length > 1"
                :options="availableChoices.inputType"
              />
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
              <!-- Pro Display XDR 材料 -->
              <fieldset v-if="Object.keys(availableChoices.displayGlass).length > 1">
                <legend class="mt-5">
                  選擇螢幕玻璃:
                </legend>
                <div class="row selection-content">
                  <ButtonOptionDisplayGlass
                    v-for="(item, index) in availableChoices.displayGlass"
                    :key="index"
                    :text="item"
                  />
                </div>
              </fieldset>
              <!-- 輸入法語言 -->
              <!-- <fieldset
                v-if="Object.keys(availableChoices.inputType).length > 1"
              >
                <legend class="mt-5">選擇 顏色:</legend>
                <div class="row selection-content">
                  <ButtonOptionSwatch
                    v-for="(item, index) in availableChoices.inputType"
                    :key="index"
                    :Color="item"
                    :Text="item"
                  ></ButtonOptionSwatch>
                </div>
              </fieldset> -->
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
              <SummarySelection>
                <p>{{ textSummary }}</p>
              </SummarySelection>
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
import ButtonOptionSwatch from '@/components/ButtonOption/ButtonOptionSwatch'
import ButtonOptionDisplayGlass from '@/components/ButtonOption/ButtonOptionDisplayGlass'
import DisplayEngravingEdit from '@/components/ModalEngraving/DisplayEngravingEdit'
import DropdownOptionLang from '@/components/ButtonOption/DropdownOptionLang'
import ImgSelection from '@/components/Summary/ImgSelection'
import SummaryPrice from '@/components/Summary/SummaryPrice.vue'
import SummarySelection from '@/components/Summary/SummarySelection.vue'
import ModalEngraving from '@/components/ModalEngraving'
export default {
  name: 'BuyAcc',
  components: {
    ButtonOptionSwatch,
    ButtonOptionDisplayGlass,
    DisplayEngravingEdit,
    DropdownOptionLang,
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
        summary: '',
        partNumber: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      currentEngraving: 'accessories/currentEngraving',
      availableChoices: 'accessories/availableChoices',
      summaryShow: 'accessories/selectionCompleted',
      textSummary: 'accessories/currentSummary'
    }),
    heroName () {
      const qeury = this.$route.query
      return `${qeury.category || ''} 配件`
    },
    hasLaserMSG () {
      return this.LaserMSG.msg1 !== ''
    }
  },
  created () {
    this.$store.commit('changeSelection', {
      Type: 'accessories',
      product: 'selectModel'
    })
    if (!this.summaryShow) {
      this.$router.push({ name: 'Accessories', query: this.$route.query })
    }
    if (this.$route.query.category && !this.summaryShow) {
      this.$store.dispatch('accessories/getAccInfo', {
        category: this.$route.query.category.toLowerCase(),
        filter: this.$route.query.filter
      })
    }
    if (!this.heroName) {
      this.$router.push({ name: 'Accessories' })
    }
  },
  destroyed () {
    this.$store.commit('changeSelection', {})
    this.resetState()
  },
  methods: {
    ...mapMutations({
      addProduct: 'cart/addProduct',
      setAvailablePoints: 'cart/setAvailablePoints',
      resetState: 'accessories/resetState'
    }),
    openLaserModal () {
      this.itemData = this.$store.getters['accessories/add2CartInfo']
      this.showLaserModal = true
    },
    AddtoCart () {
      const currentSelection = this.$store.getters.currentSelection
      const choosedItem = this.$store.getters[
        `${currentSelection.Type}/add2CartInfo`
      ]
      // 計算自付金額
      const selfPay = choosedItem.price
      // asign 選擇物品的點數預設兌換值
      choosedItem.bonus = {
        points: 0,
        exchangeRate: 0
      }
      choosedItem.engraving = this.LaserMSG
      choosedItem.selfPay = selfPay
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
    // this.$store.dispatch("accessories/getiPodInfo", {
    //   model: to.params.hero
    // });
    next()
  },
  beforeRouteEnter (to, from, next) {
    // 防止錯誤參數倒回首頁
    // https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards
    /*
      The beforeRouteEnter guard does NOT have access to this, because the guard is called before the navigation is confirmed, thus the new entering component has not even been created yet.
      However, you can access the instance by passing a callback to next. The callback will be called when the navigation is confirmed, and the component instance will be passed to the callback as the argument:
    */
    const arr = []
    if (arr.includes(to.params.hero.toLowerCase())) {
      next(vm => {
        vm.$router.go(-1)
      })
    }
    next()
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Accessories') {
      to.query.page = from.query.page
    }
    next()
  }
}
</script>
