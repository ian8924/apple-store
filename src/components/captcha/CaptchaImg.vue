<template>
  <div class="col-5 captcha__img">
    <img
      v-if="src"
      :src="src"
      class="img-fluid"
      alt="驗證碼圖片"
    >
  </div>
</template>

<script>
export default {
  name: 'CaptchaImg',
  props: {
    src: { type: String, required: true }
  }
}
</script>

<style>

</style>
