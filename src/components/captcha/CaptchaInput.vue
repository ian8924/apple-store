<template>
  <div class="col-4">
    <label
      for="captch"
      class=""
    > 驗證碼</label>
    <input
      v-model="captchaSolution"
      name="captcha"
      type="text"
      class="form-control"
      maxlength="4"
      autocomplete="off"
      @keypress.enter.prevent
    >
  </div>
</template>

<script>
export default {
  name: 'CaptchaInput',
  props: {
    value: { type: String, required: true }
  },
  computed: {
    captchaSolution: {
      get () {
        return this.value
      },
      set (value) {
        return this.$emit('input', value)
      }
    }
  }
}
</script>

<style>

</style>
