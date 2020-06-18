<template>
  <div class="container-fluid">
    <div class="row customize-content">
      <div class="col-12 localnav-header">
        <button
          class="color-gold text-nowrap pr-2"
          @click="$emit('close')"
        >
          <i class="fas fa-long-arrow-alt-left" />
        </button>
        <p class="h2 d-inline-block">
          重設密碼
        </p>
      </div>
      <div class="col-12 info-area mb-5">
        <div
          v-if="errMsg"
          class="alert alert-danger"
          role="alert"
        >
          <p class="h5 alert-heading mb-0">
            <i class="fas fa-exclamation-circle mr-2" />{{ errMsg }}
          </p>
        </div>
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
                    v-model="oldPwd"
                    label="請輸入舊密碼"
                  />
                </div>
              </div>
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
                  <InputPasswordRepeat
                    title="確認新密碼"
                  />
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
  name: 'DisplayEditPassword',
  components: { ButtonPrimary, InputPassword, InputPasswordRepeat, LoadingSpinner },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showModal: false,
      oldPwd: '',
      newPwd: '',
      errMsg: '',
      waitAPIRes: false
    }
  },
  methods: {
    onShowModal (event) {
      this.showModal = event
    },
    goResetPassword () {
      const done = this.newPwd && this.oldPwd
      this.errMsg = ''
      if (!done) return
      this.waitAPIRes = true
      if (this.oldPwd === this.newPwd) {
        this.errMsg = '新密碼不可與舊密碼相同'
        return
      }
      this.$store
        .dispatch('member/resetPassword', {
          oldPassword: this.oldPwd,
          newPassword: this.newPwd
        })
        .then(() => {
          this.$router.push({ name: 'Reset Password Success' })
        })
        .catch(() => {
          this.errMsg = '舊密碼錯誤，更改密碼失敗'
        })
        .finally(() => {
          this.waitAPIRes = false
        })
    }
  }
}
</script>
