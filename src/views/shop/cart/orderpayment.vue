<template>
  <div>
    <div>
      <div class="row customize-content">
        <div class="col-12 localnav-header-title">
          <p
            class="d-inline-block h2"
          >
            商品清單
          </p>
        </div>
      </div>
      <div class="row customize-content">
        <div class="col-12">
          <!-- 桌機版表格開始 -->
          <TableCart
            :editable="editable"
          >
            <TableRowItem
              v-for="(item, index) in listProductinCart"
              :key="index"
              :index="index"
              :info="item"
              :editable="editable"
            />
            <tr class="text-right border-0">
              <td colspan="3">
                <p class="mb-0">
                  商品小計
                </p>
              </td>
              <td colspan="2">
                <p class="text-nowrap mb-0">
                  NT$ {{ totalPrice.toLocaleString() }}
                </p>
              </td>
            </tr>
            <tr
              v-if="showVisaDiscount"
              class="text-right"
            >
              <td
                colspan="3"
                class="border-0"
              >
                <p class="color-light-red mb-0">
                  Visa卡友專屬折扣
                </p>
              </td>
              <td
                class="border-0"
                colspan="2"
              >
                <p class="color-light-red text-nowrap mb-0">
                  NT$ {{ visaDiscountInfo }}
                </p>
              </td>
            </tr>
            <tr class="text-right">
              <td
                colspan="3"
                class="border-0"
              >
                <p class="color-light-red mb-0">
                  運費
                </p>
              </td>
              <td
                class="border-0"
                colspan="2"
              >
                <p class="color-light-red text-nowrap mb-0">
                  免運
                </p>
              </td>
            </tr>
            <tr class="text-right">
              <td colspan="3">
                <p class="total">
                  自付金額
                </p>
                <!-- <p>含加值型營業稅</p> -->
              </td>
              <td colspan="2">
                <p class="text-nowrap total color-red">
                  NT$ {{ myTotalSelfPay.toLocaleString() }}
                </p>
              </td>
            </tr>
          </TableCart>
          <!-- 桌機版表格結束 -->
          <!-- 手機版開始 -->
          <MobileCartListItem
            v-for="(item, index) in listProductinCart"
            :key="index"
            :index="index"
            :info="item"
            :editable="editable"
          />
          <MobileCartTotal
            :show-visa-discount="showVisaDiscount"
            :visa-discount-info="visaDiscountInfo"
          />
          <!-- 手機版結束 -->
        </div>
      </div>
    </div>
    <ValidationObserver v-slot="{ handleSubmit,errors,invalid }">
      <form
        ref="form"
        @submit.prevent="handleSubmit()"
      >
        <InputGroupPayMagicCard
          ref="InputGroupPayMagicCard"
        />
        <!-- 收件地址 -->
        <InputGroupPayRecipient
          ref="InputGroupPayRecipient"
        />
        <!-- 發票 -->
        <InputGroupPayInvoice
          ref="InputGroupPayInvoice"
        />
        <div
          class="row customize-content"
        >
          <div class="col-12">
            <div class="action-group">
              <ButtonCancel
                text="取消"
                @click="cancel"
              />
              <ButtonPrimary
                text="下一步"
                type="submit"
                @click="check(errors,invalid)"
              />
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>

    <ModalVisaTC
      :show-modal="showModal"
      @close="showModal=false"
    />
  </div>
</template>

<script>
import ButtonCancel from '@/components/base/Button/ButtonCancel'
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'
import TableCart from './CartProductList/TableCart'
import TableRowItem from './CartProductList/TableRowItem'
import MobileCartListItem from './CartProductList/MobileCartListItem'
import MobileCartTotal from './CartProductList/MobileCartTotal'
import InputGroupPayMagicCard from '@/components/base/Input/InputGroupPayMagicCard'
import InputGroupPayRecipient from '@/components/base/Input/InputGroupPayRecipient'
import InputGroupPayInvoice from '@/components/base/Input/InputGroupPayInvoice'
import ModalVisaTC from './Modal/ModalVisaTC'
export default {
  name: 'OrderPayment',
  components: {
    ButtonCancel,
    ButtonPrimary,
    TableCart,
    TableRowItem,
    MobileCartListItem,
    MobileCartTotal,
    ModalVisaTC,
    InputGroupPayInvoice,
    InputGroupPayMagicCard,
    InputGroupPayRecipient
  },
  data () {
    return {
      editable: false, // 編輯購物車
      showModal: false, // visa 海外驗證彈窗
      showVisaDiscount: false // visa海外驗證折扣顯示
    }
  },
  computed: {
    // 購物車清單
    listProductinCart () {
      return this.$store.getters['cart/listProductinCart']
    },
    // 收件人資訊
    recipient () {
      return this.$store.getters['cart/currentRecipientInfo']
    },
    invoice () {
      return this.$store.getters['cart/currentInvoiceInfo']
    },
    // 信用卡資料
    payment () {
      return this.$store.getters['cart/currentPaymentInfo']
    },
    // 購物車總金額
    totalPrice () {
      return this.$store.getters['cart/totalPrice']
    },
    // Visa 海外折抵金額計算
    visaDiscountInfo () {
      const price = this.totalPrice
      let discount = 0
      if (this.showVisaDiscount) {
        if (price >= 3000 && price <= 10000) {
          discount = 400
        }
        if (price >= 10001 && price <= 20000) {
          discount = 500
        }
        if (price >= 20001 && price <= 30000) {
          discount = 600
        }
        if (price >= 30001 && price <= 40000) {
          discount = 800
        }
        if (price >= 40001) {
          discount = 1000
        }
      }
      this.$store.commit('cart/setDiscountPrice', discount)
      return discount
    },
    // 自付總金額
    myTotalSelfPay () {
      return this.totalPrice - this.visaDiscountInfo
    }
  },
  mounted () {
    // visa卡友海外消費折扣
    if (sessionStorage.getItem('project') === 'VISA') {
      this.showVisaDiscount = true
    }
    // 訂單資訊初始化
    this.$store.commit('cart/setOrderData', {})
  },
  methods: {
    async check (error, invalid) {
      // 檢查欄位
      const errors = error
      if (!invalid) {
        this.showReturnsHint()
        return
      }
      const finishGroupPayMagicCard = errors.Num3 === [] && errors.Year === [] && errors.Card === [] && errors.Month === []
      const finishGroupPayRecipient = errors.email === [] && errors.name === [] && errors.address === [] && errors.username === [] && errors.phone === []
      if (!finishGroupPayMagicCard) {
        this.$refs.InputGroupPayMagicCard.$el.scrollIntoView()
      } else if (!finishGroupPayRecipient) {
        this.$refs.InputGroupPayRecipient.$el.scrollIntoView()
      } else {
        this.$refs.InputGroupInvoiceElectronic.$el.scrollIntoView()
      }
    },
    // 確認資料完整性
    showReturnsHint () {
      // 檢查是否已驗證 VISA海外
      if (sessionStorage.getItem('project') === 'VISA') {
        this.goConfirmPayment()
      } else {
        this.showModal = true
      }
    },
    // 儲存起單資訊,跳轉頁面至確認資料
    async goConfirmPayment () {
      const orderData = {}
      var partNumber = []
      var engraving = []
      const card = this.$refs.InputGroupPayMagicCard.cardNum
      for (const [i, item] of this.listProductinCart.entries()) {
        partNumber[i] = item.partNumber
        engraving[i] = item.engraving || { msg1: '', msg2: '' }
      }
      orderData.Cost = this.myTotalSelfPay
      orderData.Price = this.totalPrice
      orderData.discount = this.visaDiscountInfo
      orderData.partNumber = partNumber
      orderData.engraving = engraving
      orderData.CardUUID = card
      orderData.CustomerType = 'VISA'
      this.$store.commit('cart/setOrderData', orderData)
      this.$router.push({ name: 'order comfirm' })
    },
    // 取消,回購物車
    cancel () {
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
      this.$router.push({ name: 'shop bag' })
    }
  },
  beforeRouteLeave (to, from, next) {
    // 判斷若不是回上一步或下一步則清空付款資料
    if (to.name === 'order comfirm' || to.name === 'shop bag') {
      console.log(to.name)
    } else {
      this.$store.commit('cart/setRecipientInfo', {})
      this.$store.commit('cart/setInvoiceInfo', {})
      this.$store.commit('cart/setPaymentInfo', {})
    }
    next()
  },
  beforeRouteEnter (to, from, next) {
    next(
      vm => {
        // 檢查無商品回購物車
        if (vm.$store.getters['cart/listProductinCart'].length === 0) {
          vm.$router.push({ name: 'shop bag' })
          return
        }
        // 檢查無登入回登入頁
        if (!vm.$store.getters['member/isLoggedIn']) {
          vm.$router.push({ name: 'signin' })
        }
      }
    )
  }
}
</script>
