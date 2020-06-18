<template>
  <div>
    <main>
      <DisplayServerError
        v-if="currentProduct.length === 0"
        @click="retry"
      />
      <div
        v-if="currentProduct.length > 0"
        class="container-fluid bg-white"
      >
        <div
          class="row"
          :class="{ 'text-center': !showSelection }"
        >
          <div class="row customize-content">
            <div
              v-if="!showSelection"
              class="col-md-12 customize-content"
            >
              <h2 class="pt-5">
                選擇你的全新 {{ heroName }}{{ titleFinish }}
              </h2>
            </div>
            <div
              v-if="!showSelection"
              class="col-md-12 customize-content"
            >
              <!-- 尺寸切換鍵 -->
              <ul
                v-if="choiceSize.length > 1"
                class="nav nav-options-content mb-3 sticky-top"
              >
                <TabOptionScreenSize
                  v-for="val in choiceSize"
                  :key="val"
                  :size="val"
                  :current-size="currentSize"
                  @click="changeScrennSize(val)"
                />
              </ul>
              <!-- 產品列表 -->
              <transition
                name="component-fade"
                mode="out-in"
              >
                <TabContentMac
                  :key="currentSize"
                  :title="contentTitle"
                  :product-count="currentProduct.length"
                >
                  <TabOptionProduct
                    v-for="item in currentProduct"
                    :key="item[0].specName"
                    :item="item"
                    :colors="choiceColor"
                    @click="onChooseMac"
                  />
                </TabContentMac>
              </transition>
            </div>
          </div>
          <transition-group
            class="row customize-content"
            name="component-fade"
            mode="out-in"
          >
            <!-- 產品圖片 -->
            <div
              v-if="showSelection"
              :key="currentPart.specName"
              class="col-sm-12 col-md-6"
            >
              <ImgSelection />
            </div>
            <!-- 產品選項 -->
            <div
              v-if="showSelection"
              :key="currentPart.specName + '1'"
              class="col-sm-12 col-md-6"
            >
              <div class="customize-p-selection pb-2">
                <h2>購買你的 {{ heroName }}</h2>
                <p>現在訂購並獲得免費運送</p>
              </div>
              <!-- 規格 -->
              <ul class="modelspecs text-left">
                <li
                  v-for="(spec, index) in currentPart.modelspecs"
                  :key="index"
                >
                  {{ spec }}
                </li>
              </ul>
              <!-- 摘要 -->
              <SummarySelection v-show="summaryShow">
                <p>{{ textSummary }}</p>
              </SummarySelection>
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
          </transition-group>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import TabOptionScreenSize from '@/components/TabOption/TabOptionScreenSize'
import TabContentMac from '@/components/TabOption/TabContentMac'
import TabOptionProduct from '@/components/TabOption/TabOptionProduct'
import ImgSelection from '@/components/Summary/ImgSelection'
import SummaryPrice from '@/components/Summary/SummaryPrice.vue'
import SummarySelection from '@/components/Summary/SummarySelection.vue'

const titleFinish = '，並選定一種外觀。'

export default {
  name: 'BuyMac',
  components: {
    TabOptionScreenSize,
    TabContentMac,
    TabOptionProduct,
    ImgSelection,
    SummaryPrice,
    SummarySelection
  },
  data () {
    return {
      currentSize: '',
      titleFinish: '',
      showSelection: false,
      currentPart: {},
      LaserMSG: { msg1: '', msg2: '' }
    }
  },
  computed: {
    ...mapGetters({
      heroName: 'mac/currentHero',
      availableChoices: 'mac/availableChoices',
      summaryShow: 'mac/selectionCompleted',
      textSummary: 'mac/currentSummary'
    }),
    choiceSize () {
      return this.availableChoices.screenSize || []
    },
    choiceColor () {
      return this.availableChoices.finish || []
    },
    currentProduct () {
      const groupMac = this.availableChoices.groupMac

      const currentGroup = []

      for (const key in groupMac) {
        const mac = groupMac[key]
        if (
          parseFloat(mac[0].productSize) === this.currentSize ||
          mac[0].productSize === this.currentSize
        ) {
          currentGroup.push(mac)
        }
      }
      return currentGroup
    },
    contentTitle () {
      if (this.choiceSize.length > 1) {
        return `${this.currentSize} 吋 ${this.heroName}`
      }
      return ''
    },
    textSummary () {
      let size = this.currentPart.productSize
      size = !isNaN(parseFloat(size)) ? `${size} 吋` : ''
      const CPU = this.currentPart.title.split('，')[0]
      let Color = this.currentPart.color
      Color = Color
        ? ` - ${this.$t(`finish.${Color.toLowerCase().replace(/\s/g, '-')}`)}`
        : ''

      let Capacity = this.currentPart.capacity
      Capacity = Capacity > 5 ? `${Capacity}GB` : `${Capacity}TB`
      const summary = `${size} ${this.heroName} ${CPU}, ${Capacity}${Color}`
      this.$store.commit('mac/setTextSummary', summary)
      return summary
    }
  },
  watch: {
    choiceSize () {
      this.currentSize = this.choiceSize[0] || ''
    },
    choiceColor () {
      this.titleFinish = this.choiceColor.length > 1 ? titleFinish : ''
    }
  },
  created () {
    this.currentSize = this.choiceSize[0] || ''
    this.titleFinish = this.choiceColor.length > 1 ? titleFinish : ''
  },
  destroyed () {
    this.$store.commit('changeSelection', {})
  },
  beforeCreate () {
    this.$store.commit('changeSelection', {
      Type: 'mac',
      product: 'selectModel'
    })
    // 取得當前要顯示的產品項目
    this.$store.dispatch('mac/getMacInfo', {
      model: this.$route.params.hero
    })
    // this.$store.commit("mac/setCurrenMacModel");
  },
  methods: {
    ...mapMutations({
      addProduct: 'cart/addProduct',
      setAvailablePoints: 'cart/setAvailablePoints',
      selectModel: 'mac/selectModel'
    }),
    changeScrennSize (event) {
      if (event === this.currentSize) return
      this.currentSize = event
    },
    onChooseMac (mac) {
      this.selectModel(mac)
      this.$route.query.mac = mac.name
      this.showSelection = true
      this.currentPart = mac
    },
    retry () {
      this.$store.dispatch('mac/getMacInfo', {
        model: this.$route.params.hero
      })
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
    this.showSelection = false
    this.$store.dispatch('mac/getMacInfo', {
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
    const arr = ['macbook-air', 'macbook-pro', 'imac', 'imac-pro', 'mac-mini']
    if (!arr.includes(to.params.hero.toLowerCase())) {
      next(vm => {
        vm.$router.go(-1)
      })
    }
    next()
  }
}
</script>

<style scpoed>
.chapternav-icon {
  width: 48px;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
