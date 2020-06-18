<template>
  <div>
    <label for="confirm">{{ label }}</label>
    <ValidationProvider
      v-slot="{ errors }"
      rules="required|password:@confirm"
    >
      <input
        v-model="pwd"
        type="password"
        class="form-control"
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
  name: 'InputPasswordRepeat',
  props: {
    value: { default: '', type: String },
    label: { default: '確認新密碼', type: String },
    disabled: { default: false, type: Boolean },
    placeholder: { default: '請再次輸入密碼', type: String }
  },
  data: () => {
    return {
      pwd: null
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
