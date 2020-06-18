<template>
  <div class="row customize-content mt-5">
    <div class="col-12 localnav-header">
      <h2>付款方式（信用卡）</h2>
    </div>
    <div class="col-md-6">
      <InputMagicCard
        v-if="true"
        v-model="cardNum"
        :card-num="cardNum"
        class="form-group"
      />
      <span class="d-block mb-2">信用卡有效期限</span>
      <div class="form-group row">
        <label
          for="Month"
          class="col-sm-1 col-form-label"
        >月</label>
        <div class="col-sm-5">
          <ValidationProvider
            v-slot="{ errors }"
            name="Month"
            rules="required"
          >
            <select
              id="Month"
              v-model="validMonth"
              class="form-control"
              :class="{ 'is-invalid': errors[0] }"
            >
              <option
                value=""
                selected
              >
                請選擇月
              </option>
              <option
                v-for="(month, index) in months"
                :key="index"
              >
                {{
                  month
                }}
              </option>
            </select>
            <div
              v-show="errors[0]"
              class="invalid-feedback text-right"
            >
              {{ errors[0] }}
            </div>
          </ValidationProvider>
        </div>
        <label
          for="Year"
          class="col-sm-1 col-form-label"
        >年</label>
        <div class="col-sm-5">
          <ValidationProvider
            v-slot="{ errors }"
            name="Year"
            rules="required"
          >
            <select
              id="Year"
              v-model="validYear"
              class="form-control"
              :class="{ 'is-invalid': errors[0] }"
            >
              <option
                value=""
                selected
              >
                請選擇年
              </option>
              <option
                v-for="(year, index) in years"
                :key="index"
              >
                {{
                  year
                }}
              </option>
            </select>
            <div
              v-show="errors[0]"
              class="invalid-feedback text-right"
            >
              {{ errors[0] }}
            </div>
          </ValidationProvider>
        </div>
      </div>
      <div class="form-group">
        <label for="Num3">卡片背後3碼</label>
        <ValidationProvider
          v-slot="{ errors }"
          name="Num3"
          rules="required|min:3"
        >
          <input
            id="Num3"
            v-model="securityCode"
            type="tel"
            maxlength="3"
            class="form-control"
            :class="{ 'is-invalid': errors[0] }"
            aria-describedby="NumHelp3"
            placeholder="請輸入末三碼"
          >
          <div
            v-show="errors[0]"
            class="invalid-feedback"
          >
            {{ errors[0] }}
          </div>
          <small
            id="NumHelp3"
            class="form-text text-muted"
          />
          <div
            v-if="showVisaInfo"
            style="color:red;"
          >
            註：<br>
            1. 本站活動期間限定使用Visa信用卡 。<br>
            2. 欲使用「Apple Rewards Store抵用券最高折抵1,000元」活動，需符合活動規範，詳見 <a
              href="#"
              @click="toVisaTC"
            >活動網站公告</a> 。
          </div>
        </ValidationProvider>
      </div>
    </div>
  </div>
</template>

<script>
import InputMagicCard from './InputMagicCard'
export default {
  name: 'InputGroupPayMagicCard',
  components: { InputMagicCard },
  data () {
    return {
      cardNum: '',
      validMonth: '',
      validYear: '',
      securityCode: '',
      showVisaInfo: true
    }
  },
  computed: {
    years () {
      const year = new Date().getFullYear()
      return Array.from({ length: 20 }, (value, index) => year + index)
    },
    months () {
      return Array.from({ length: 12 }, (value, index) => index + 1)
    },
    usedCard () {
      return this.$store.getters['cart/currentUsedCard']
    },
    currentPaymentInfo () {
      return this.$store.getters['cart/currentPaymentInfo']
    }
  },
  watch: {
    cardNum (val) {
      this.$store.commit('cart/setSwipeCard', val)
    }
  },
  created () {
    const cardDatas = this.$store.getters['cart/currentPaymentInfo']
    this.securityCode = cardDatas.securityCode ? cardDatas.securityCode : ''
    this.validYear = cardDatas.cardExpire ? cardDatas.cardExpire.slice(3, 7) : ''
    this.validMonth = cardDatas.cardExpire ? parseInt(cardDatas.cardExpire.slice(0, 2)) : ''

    this.$watch(
      vm => [vm.validMonth, vm.validYear, vm.securityCode],
      () => {
        this.commitChange()
      }
    )
    // 重新回到付款頁自動帶入付款資料
    if (Object.keys(this.currentPaymentInfo).length) {
      // 銀行不要自動帶入付款資料
      // this.securityCode = this.currentPaymentInfo.securityCode
      // const validYM = this.currentPaymentInfo.cardExpire.split('/')
      // this.validMonth = parseInt(validYM[0]).toString()
      // this.validYear = parseInt(validYM[1]).toString()
    }
    if (sessionStorage.getItem('project') === 'VISA') {
      this.showVisaInfo = false
    }
  },
  methods: {
    commitChange () {
      const cardExpire = `${this.validMonth.padStart(2, '0')}/${this.validYear}`
      const payload = {
        cardExpire: cardExpire,
        securityCode: this.securityCode
      }
      if (this.validMonth.padStart(2, '0') && this.validYear) {
        this.$store.commit('cart/setPaymentInfo', payload)
      } else {
        this.$store.commit('cart/setPaymentInfo', {})
      }
    },
    toVisaTC () {
      this.$router.push({ name: 'visa tc' })
    }
  }
}
</script>
