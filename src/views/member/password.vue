<template>
  <main>
    <DisplayForgetPassword
      v-if="verified"
      :verify-code="verifyCode"
    />
    <div
      v-if="!verified"
      class="container-fluid"
    >
      <div class="row customize-content">
        <div class="col-12 localnav-header">
          <h2 class="d-inline-block">
            忘記密碼
          </h2>
        </div>
        <div class="col-12 info-area mb-5">
          <p>請輸入你註冊的行動電話號碼。我們會發送一封驗證碼簡訊給你。</p>
          <div class="row info-area-item">
            <!-- 輸入帳號 -->
            <div
              v-if="!showVerify && !waitAPIRes"
              class="col-12"
            >
              <div class="form-group">
                <InputMobile
                  v-model="account"
                  label="帳號 手機號碼"
                />
              </div>
            </div>
            <!-- loading spinner -->
            <LoadingSpinner
              v-if="waitAPIRes"
              class="col"
            />
            <!-- 輸入驗證碼 -->
            <div
              v-if="showVerify && !waitAPIRes"
              class="col-12 text-center"
            >
              <h5 class="mb-4">
                已發送簡訊驗證碼至：<span class="color-light-red">{{
                  account
                }}</span>
              </h5>
              <p class="line">
                請在時間內輸入簡訊上面四個驗證碼數字。<Timer
                  :trigger="trigger"
                  @timeout="onTimeOut"
                />
              </p>
              <InputVerifySMS
                v-show="!errorMsg"
                :lock-verify-input="lockVerifyInput"
                :is-verify-error="isVerifyError"
                @input="onCheckVerifyCode"
              />
              <!-- 超時 -->
              <p
                v-if="errorMsg || false"
                class="h5 alert-heading m-3"
              >
                <i class="fas fa-exclamation-circle mr-2" />{{ errorMsg }}
              </p>
            </div>
            <div
              v-if="!waitAPIRes"
              class="col-12 action-group"
            >
              <ButtonPrimary
                v-if="!showVerify && !waitAPIRes"
                text="傳送"
                @click="sendVerifySMSForgetPWD"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'
import InputMobile from '@/components/base/Input/InputMobile'
import LoadingSpinner from '@/components/base/LoadingSpinner'
import InputVerifySMS from '@/components/base/Input/InputVerifySMS'
import DisplayForgetPassword from '@/views/member/Section/DisplayForgetPassword'
import Timer from '@/components/Timer/Timer'

export default {
  name: 'Password',
  components: {
    ButtonPrimary,
    InputMobile,
    LoadingSpinner,
    InputVerifySMS,
    Timer,
    DisplayForgetPassword
  },
  data () {
    return {
      showVerify: false,
      account: null,
      waitAPIRes: false,
      trigger: false,
      isVerifyTimeOut: false,
      lockVerifyInput: false,
      isVerifyError: false,
      verified: false,
      errorMsg: '',
      verifyCode: ''
    }
  },
  methods: {
    sendVerifySMSForgetPWD () {
      if (!this.account) return
      this.waitAPIRes = true
      this.trigger = true
      this.$store.commit('member/setRegistryAccount', this.account)
      this.$store
        .dispatch('member/sendVerifySMSForgetPWD', this.account)
        .then(res => {
          this.isSendVerifyCode = true
          this.showVerify = true
        })
        .catch(() => {
          alert('此手機尚未加入會員')
          this.$store.commit('member/setRegistryAccount', '')
          this.$router.push({
            name: 'tnc'
          })
          this.isSendVerifyCode = false
          this.showVerify = false
        })
        .finally(() => {
          this.waitAPIRes = false
          this.trigger = false
        })
    },
    onCheckVerifyCode (event) {
      this.lockVerifyInput = true
      this.isVerifyError = false
      this.errorMsg = ''
      this.$store
        .dispatch('member/checkVerifyCodeForgetPWD', {
          mobileNumber: this.account,
          verifyCode: event
        })
        .then(() => {
          this.verified = true
          this.verifyCode = event
        })
        .catch(() => {
          this.verified = false
          this.resetVerifyCode()
          this.lockVerifyInput = false
          this.isVerifyError = true
          // console.log("TCL: onCheckVerifyCode -> error", error);
        })
    },
    onTimeOut () {
      this.isVerifyTimeOut = true
      this.isVerifyError = false
      this.errorMsg = '驗證逾時，請從新發送驗證簡訊'
    },
    resetVerifyCode () {
      this.verify1 = ''
      this.verify2 = ''
      this.verify3 = ''
      this.verify4 = ''
    }
  }
}
</script>
