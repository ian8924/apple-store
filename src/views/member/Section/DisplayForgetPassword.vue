<template>
  <div class="container-fluid">
    <div class="row customize-content">
      <div class="col-12 localnav-header">
        <p class="h2 d-inline-block">
          重設密碼
        </p>
      </div>
      <div class="col-12 info-area mb-5">
        <p>
          變更密碼後，系統會將您登出所有裝置
          (包括手機)。屆時您必須在所有裝置上輸入新密碼，才能登入帳戶。
        </p>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(goResetPassword)">
            <LoadingSpinner v-if="waitAPIRes" />
            <div
              v-if="!waitAPIRes"
              class="row info-area-item"
            >
              <div class="col-12">
                <div class="form-group">
                  <InputPassword
                    v-model="newPwd"
                    label="新密碼"
                  />
                </div>
              </div>
              <div class="col-12 mb-5">
                <div class="form-group">
                  <InputPasswordRepeat />
                </div>
              </div>
              <div class="col-12 action-group">
                <ButtonPrimary
                  text="確認"
                  type="submit"
                />
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'
import InputPassword from '@/components/base/Input/InputPassword'
import InputPasswordRepeat from '@/components/base/Input/InputPasswordRepeat'
import LoadingSpinner from '@/components/base/LoadingSpinner'

export default {
  name: 'DisplayForgetPassword',
  components: { ButtonPrimary, InputPassword, InputPasswordRepeat, LoadingSpinner },
  props: {
    verifyCode: { type: String, required: true }
  },
  data () {
    return {
      showModal: false,
      oldPwd: '',
      newPwd: '',
      pwdrepeat: false,
      waitAPIRes: false
    }
  },
  methods: {
    onShowModal (event) {
      this.showModal = event
    },
    goResetPassword () {
      const done = this.newPwd
      if (!done) return
      this.waitAPIRes = true
      this.$store
        .dispatch('member/resetPasswordForgetPWD', {
          newPassword: this.newPwd,
          passCode: this.verifyCode
        })
        .then(() => {
          this.$router.push({ name: 'Reset Password Success' })
        })
        .catch(() => {
          alert('error')
        })
        .finally(() => {
          this.waitAPIRes = false
        })
    }
  }
}
</script>
