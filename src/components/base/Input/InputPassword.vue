<template>
  <div>
    <label for="Password">{{ label }}</label>
    <ValidationProvider
      v-slot="{ errors }"
      name="confirm"
      rules="required"
    >
      <input
        id="Password"
        v-model="pwd"
        type="password"
        class="form-control"
        name="password"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="{
          'is-invalid': errors[0]
        }"
        @change="onEmit"
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
  name: 'InputPassword',
  props: {
    value: { default: '', type: String },
    label: { default: '', type: String },
    disabled: { default: false, type: Boolean },
    placeholder: { default: '請輸入密碼', type: String }
  },
  data: () => {
    return {
      pwd: null
    }
  },
  watch: {
    value () {
      // 給定初始值
      this.pwd = this.value
    }
  },
  methods: {
    onEmit () {
      validate(this.pwd, 'required').then(result => {
        if (result.valid) {
          this.$emit('input', this.pwd)
        } else {
          this.$emit('input', null)
        }
      })
    }
  }
}
</script>
