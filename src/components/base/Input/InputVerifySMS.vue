<template>
  <form
    class="form-inline justify-content-center my-4"
    @submit.prevent
  >
    <label
      for="Verify1"
      class="sr-only"
    >驗證碼</label>
    <input
      ref="Verify1"
      v-model="verify1"
      type="tel"
      maxlength="1"
      class="form-control verify-input p-1"
      :class="{ 'is-invalid': isVerifyError }"
      :disabled="lockVerifyInput"
      @keyup.delete="autoFocus(null)"
      @input="autoFocus(2)"
    >
    <label
      for="Verify2"
      class="sr-only"
    >驗證碼</label>
    <input
      ref="Verify2"
      v-model="verify2"
      type="tel"
      maxlength="1"
      class="form-control verify-input p-1"
      :class="{ 'is-invalid': isVerifyError }"
      :disabled="lockVerifyInput"
      @keyup.delete="autoFocus(null)"
      @input="autoFocus(3)"
    >
    <label
      for="Verify3"
      class="sr-only"
    >驗證碼</label>
    <input
      ref="Verify3"
      v-model="verify3"
      type="tel"
      maxlength="1"
      class="form-control verify-input p-1"
      :class="{ 'is-invalid': isVerifyError }"
      :disabled="lockVerifyInput"
      @keyup.delete="autoFocus(null)"
      @input="autoFocus(4)"
    >
    <label
      for="Verify4"
      class="sr-only"
    >驗證碼</label>
    <input
      ref="Verify4"
      v-model="verify4"
      type="tel"
      maxlength="1"
      class="form-control verify-input p-1"
      :class="{ 'is-invalid': isVerifyError }"
      :disabled="lockVerifyInput"
    >
    <div class="invalid-feedback">
      驗證碼不正確
    </div>
  </form>
</template>

<script>
const refVerify = ['Verify1', 'Verify2', 'Verify3', 'Verify4']

export default {
  name: 'InputVerifySMS',
  props: {
    lockVerifyInput: { type: Boolean, default: false },
    isVerifyError: { type: Boolean, default: false }
  },
  data () {
    return {
      verify1: '',
      verify2: '',
      verify3: '',
      verify4: ''
    }
  },
  watch: {
    isVerifyError () {
      if (!this.isVerifyError) return
      this.verify1 = ''
      this.verify2 = ''
      this.verify3 = ''
      this.verify4 = ''
      this.$refs[refVerify[0]].focus()
    },
    verify1 () {
      this.checkVerifyCode()
    },
    verify2 () {
      this.checkVerifyCode()
    },
    verify3 () {
      this.checkVerifyCode()
    },
    verify4 () {
      this.checkVerifyCode()
    }
  },
  methods: {
    autoFocus (event) {
      if (!event) {
        return
      }
      this.$refs[refVerify[event - 1]].focus()
    },
    checkVerifyCode () {
      // 呼叫 API 進行驗證
      const done = this.verify1 && this.verify2 && this.verify3 && this.verify4
      if (!done) {
        return
      }
      this.$emit(
        'input',
        `${this.verify1}${this.verify2}${this.verify3}${this.verify4}`
      )
    }
  }
}
</script>
