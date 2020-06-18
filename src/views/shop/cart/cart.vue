<template>
  <main>
    <div
      class="container-fluid bg-white"
    >
      <!-- 商品清單 -->
      <div v-if="listProductinCart.length!==0">
        <div class="row customize-content">
          <div class="col-12 localnav-header-title">
            <p
              class="d-inline-block h2"
            >
              確認商品
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
                @click="deleteProduct"
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
                <!-- <p class="text-nowrap">約 NT$3,108</p> -->
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
              @click="deleteProduct"
            />
            <MobileCartTotal
              :show-visa-discount="showVisaDiscount"
              :visa-discount-info="visaDiscountInfo"
            />
          <!-- 手機版結束 -->
          </div>
        </div>
        <div
          class="row customize-content"
        >
          <div class="col-12">
            <div class="action-group">
              <ButtonCancel
                text="繼續購物"
                @click="cancelCart"
              />
              <ButtonPrimary
                text="結帳"
                @click="goPayment"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 無商品 -->
      <div
        v-else
        class="row customize-content "
      >
        <div class="col-12 text-center mt-5">
          <h2>購物袋中沒有任何商品。</h2>
          <h5 class="mb-4">
            登入查看你已儲存的商品。或繼續選購。
          </h5>
          <ButtonPrimary
            type="button"
            text="繼續選購"
            @click="$router.push({ name: 'home' })"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'
import ButtonCancel from '@/components/base/Button/ButtonCancel'
import TableCart from './CartProductList/TableCart'
import TableRowItem from './CartProductList/TableRowItem'
import MobileCartListItem from './CartProductList/MobileCartListItem'
import MobileCartTotal from './CartProductList/MobileCartTotal'
export default {
  name: 'Cart',
  components: {
    ButtonCancel,
    ButtonPrimary,
    TableCart,
    TableRowItem,
    MobileCartListItem,
    MobileCartTotal
  },
  data () {
    return {
      editable: true, // 編輯購物車
      showVisaDiscount: false // visa海外驗證折扣顯示
    }
  },
  computed: {
    // 購物車清單
    listProductinCart () {
      return this.$store.getters['cart/listProductinCart']
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
    // 自付金額
    myTotalSelfPay () {
      return this.totalPrice - this.visaDiscountInfo
    }
  },
  mounted () {
    // visa卡友海外消費折扣
    if (sessionStorage.getItem('project') === 'VISA') {
      this.showVisaDiscount = true
    }
    this.$store.commit('cart/setOrderData', {})
  },
  methods: {
    // 刪除購物車Item
    deleteProduct (event) {
      this.$store.commit('cart/deleteProduct', event)
    },
    // 結帳
    goPayment () {
      if (!this.$store.getters['member/isLoggedIn']) {
        this.$router.push({ name: 'signin' })
        return
      }
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
      this.$router.push({ name: 'payment' })
    },
    // 繼續購物
    cancelCart () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
