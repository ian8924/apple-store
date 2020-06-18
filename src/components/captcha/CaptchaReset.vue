<template>
  <div class="col-3 captcha__reset">
    <button
      title="重新發送驗證碼"
      class="mb-0 p-0 mx-18 captcha__reset form-control border-0"
      @click="refresh"
    >
      <i class="fas fa-redo-alt" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'CaptchaReset',
  methods: {
    refresh () {
      this.$emit('click')
    }
  }

}
</script>

<style>
.captcha__reset button {
  width: 24px;

}
</style>
