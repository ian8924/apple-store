<template>
  <main>
    <div class="row customize-content">
      <div class="col-12 localnav-header separation-line page-title">
        <p class="h2">
          加入會員
        </p>
        <p>&nbsp;驗證您的手機號碼</p>
      </div>

      <div class="container col-md-6 login-group">
        <form @submit.prevent>
          <div
            v-if="errorMsg && !showModal"
            class="alert alert-danger mb-3"
            role="alert"
          >
            <p class="h5 alert-heading mb-0">
              <i class="fas fa-exclamation-circle mr-2" />{{ errorMsg }}
            </p>
          </div>
          <div
            v-show="!showModal"
            class="form-group align-item-center"
          >
            <InputMobile
              v-model="account"
              label="帳號 手機號碼"
            />
          </div>
        </form>
        <div
          v-show="showModal"
          class="col-12 info-area mb-5"
        >
          <div class="row info-area-item">
            <div class="col-12 text-center">
              <h5 class="mb-4">
                已發送簡訊驗證碼至：<span class="color-light-red">{{
                  account
                }}</span>
              </h5>
              <p class="line">
                請在時間內輸入簡訊上面四個驗證碼數字。<Timer
                  v-if="showModal"
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
          </div>
        </div>
      </div>
      <div class="col-12 separation-line" />
      <div
        class="container  col-md-5 login-group d-flex justify-content-around  align-items-center text-center"
      >
        <!-- 按鍵 -->
        <ButtonPrimary
          v-if="showModal"
          :disabled="btnDisabled"
          text="重新填寫"
          @click="goInputAccout"
        />
        <ButtonPrimary
          v-if="!showModal"
          :text="showModal ? '重新發送' : '發送簡訊'"
          :disabled="btnDisabled"
          @click="goVerify"
        >
          {{ showModal ? "重新發送" : "發送簡訊" }}
        </ButtonPrimary>
        <ButtonPrimary
          v-if="showModal"
          text="重新填寫"
          :disabled="btnDisabled"
          @click="goVerify"
        />
      </div>
    </div>
  </main>
</template>

<script>
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'
import InputMobile from '@/components/base/Input/InputMobile'
import InputVerifySMS from '@/components/base/Input/InputVerifySMS'
import Timer from '@/components/Timer/Timer'

export default {
  name: 'Verify',
  components: { ButtonPrimary, InputMobile, Timer, InputVerifySMS },
  data: () => {
    return {
      showModal: false,
      account: null,
      isSendVerifyCode: false,
      isVerifyTimeOut: false,
      lockVerifyInput: false,
      isVerifyError: false,
      errorMsg: '',
      trigger: false
    }
  },
  computed: {
    btnDisabled () {
      if (this.showModal) {
        return !this.isVerifyTimeOut
      } else {
        return this.account === null
      }
    }
  },
  methods: {
    goVerify () {
      const vm = this
      vm.trigger = true
      // 驗證碼對應 DB 表格 IM_CardBonus.dbo.UserInfo
      vm.$store.commit('changeWaitServerResponse', true, { root: true })
      vm.errorMsg = ''
      this.$store
        .dispatch('member/verifyMobile', this.account)
        .then(res => {
          vm.isSendVerifyCode = true
          vm.showModal = true
        })
        .catch(error => {
          const errMsg = error.response.data.message
          switch (errMsg) {
            case 'Validate user error User already active and sign up':
              this.errorMsg = '此電話號碼已註冊'
              break
            case 'Validate user error User already active':
              this.$store.commit('member/setRegistryAccount', this.account)
              this.$router.push({
                name: 'registry'
              })
              break
            default:
              break
          }
        })
        .finally(() => {
          vm.$store.commit('changeWaitServerResponse', false, { root: true })
          vm.trigger = false
        })
      // for dev
      // vm.isSendVerifyCode = true;
      // vm.showModal = true;
    },
    onCheckVerifyCode (event) {
      this.lockVerifyInput = true
      this.isVerifyError = false
      this.errorMsg = ''
      this.$store
        .dispatch('member/checkVerifyCode', {
          mobileNumber: this.account,
          verifyCode: event
        })
        .then(() => {
          this.$router.push({
            name: 'registry'
          })
        })
        .catch(() => {
          this.resetVerifyCode()
          this.lockVerifyInput = false
          this.isVerifyError = true
        })
    },
    goInputAccout () {
      this.showModal = false
      this.isVerifyTimeOut = false
      this.errorMsg = ''
      this.isSendVerifyCode = false
      this.resetVerifyCode()
      this.lockVerifyInput = false
    },
    resetVerifyCode () {
      this.verify1 = ''
      this.verify2 = ''
      this.verify3 = ''
      this.verify4 = ''
    },
    onCloseModal () {
      this.showModal = false
      this.resetVerifyCode()
    },
    onTimeOut () {
      this.isVerifyTimeOut = true
      this.isVerifyError = false
      this.errorMsg = '驗證逾時，請從新發送驗證簡訊'
    }
  }
}
</script>

<style>
.verify-account {
  min-height: 400px;
}
.customize-content .login-group {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
