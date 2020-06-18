<template>
  <div>
    <label for="Email1">信箱 Email</label>
    <ValidationProvider
      v-slot="{ errors }"
      name="email"
      rules="email||required"
    >
      <input
        id="email"
        v-model="email"
        type="email"
        class="form-control"
        name="email"
        :placeholder="placeholder"
        :class="{ 'is-invalid': errors[0] }"
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
  name: 'InputEmail',
  props: {
    value: { type: String, default: '' },
    placeholder: { type: String, default: '請輸入電子信箱' }
  },
  data: () => {
    return {
      email: null
    }
  },
  watch: {
    value () {
      // 給定初始值
      this.email = this.value
    }
  },
  mounted () {
    this.email = this.value
  },
  methods: {
    onEmit (event) {
      validate(this.email, 'email||required').then(result => {
        if (result.valid) {
          this.$emit('input', this.email)
        } else {
          this.$emit('input', null)
        }
      })
    }
  }
}
</script>
