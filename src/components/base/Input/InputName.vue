<template>
  <div>
    <label for="username">{{ label }}</label>
    <ValidationProvider
      v-slot="{ errors }"
      name="username"
      rules="max:10||required"
    >
      <input
        id="username"
        v-model="username"
        type="text"
        class="form-control"
        name="username"
        :placeholder="`請輸入${label}`"
        maxlength="10"
        :disabled="disabled"
        :class="{ 'is-invalid': errors[0] }"
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
  name: 'InputName',
  props: {
    disabled: { type: Boolean, default: false },
    value: { default: '', type: String },
    label: { default: '姓名', type: String }
  },
  data: () => {
    return {
      username: null
    }
  },
  watch: {
    value () {
      this.username = this.value
    }
  },
  mounted () {
    this.username = this.value
  },
  methods: {
    onEmit (event) {
      validate(this.username, 'max:10||required').then(result => {
        if (result.valid) {
          this.$emit('input', this.username)
        } else {
          this.$emit('input', null)
        }
      })
    }
  }
}
</script>
