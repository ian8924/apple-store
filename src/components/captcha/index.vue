<template>
  <div class="form-row align-items-end">
    <CaptchaInput
      v-model="captchaSolution"
    />
    <CaptchaImg :src="captchaImg" />
    <CaptchaReset @click="reset" />
  </div>
</template>

<script>
import captcha from '../../stores/captcha.module'
import CaptchaInput from './CaptchaInput'
import CaptchaReset from './CaptchaReset'
import CaptchaImg from './CaptchaImg'
export default {
  name: 'Captcha',
  components: { CaptchaInput, CaptchaReset, CaptchaImg },
  computed: {
    captchaID: {
      get () {
        return this.$store.state.captcha.captchaID
      }
    },
    captchaImg: {
      get () {
        return this.$store.getters['captcha/captchaImg']
      }
    },
    captchaSolution: {
      get () {
        return this.$store.state.captcha.captchaSolution
      },
      set (value) {
        this.$store.commit('captcha/SET_CAPTCHA_SOLUTION', value)
      }
    }
  },
  beforeCreate () {
    if (this.$store._modules.root._children.captcha === undefined) {
      this.$store.registerModule('captcha', captcha())
    }
  },
  beforeDestroy () {
    if (this.$store._modules.root._children.captcha !== undefined) {
      this.$store.unregisterModule('captcha')
    }
  },
  created () {
    this.reset()
  },
  methods: {
    reset () {
      this.$store.dispatch('captcha/GET_CAPTCHA')
      this.captchaSolution = ''
    },
    async execute () {
      if (this.captchaSolution.length !== 4) {
        return this.$emit('error', false)
      }
      const isVerify = await this.$store.dispatch('captcha/VERIFY_CAPTCHA')
      if (isVerify) {
        this.$emit('verify', isVerify)
      } else {
        this.$emit('error', isVerify)
      }
    }
  }
}
</script>

<style>

</style>
