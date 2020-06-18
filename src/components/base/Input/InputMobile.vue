<template>
  <div>
    <label for="phone">{{ label }}</label>
    <ValidationProvider
      v-slot="{ errors }"
      name="phone"
      rules="mobile||required"
    >
      <input
        id="phone"
        v-model="phone"
        :disabled="disabled"
        maxlength="10"
        :placeholder="placeholder"
        :class="{ 'is-invalid': errors[0] }"
        class="form-control"
        type="tel"
        @input="onEmit"
      >
      <div
        style="
          margin-top: .25rem;
          font-size: 80%;
          color: #dc3545;
        "
      >
        {{ errors[0] }}
      </div>
    </ValidationProvider>
  </div>
</template>

<script>
import { validate } from 'vee-validate'

export default {
  name: 'InputMobile',
  props: {
    value: { default: '', type: String },
    label: { default: '', type: String },
    disabled: { default: false, type: Boolean },
    placeholder: { default: '請輸入帳號', type: String }
  },
  data () {
    return {
      phone: null
    }
  },
  watch: {
    value () {
      // 給定初始值
      this.phone = this.value
    }
  },
  methods: {
    onEmit () {
      validate(this.phone, 'mobile||required').then(result => {
        if (result.valid) {
          this.$emit('input', this.phone)
        } else {
          this.$emit('input', null)
        }
      })
    }
  }
}
</script>
