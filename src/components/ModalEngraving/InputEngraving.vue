<template>
  <div class="form-group">
    <label
      for="engraving"
      class="sr-only"
    >雷射鐫刻內容第一行</label>
    <ValidationProvider
      v-slot="{ errors }"
      name="username"
      :rules="`mixedENTW|hasSpecialChar|hasEmoji|checkLength:${charLimit.ch},${charLimit.en}`"
    >
      <input
        id="engraving"
        v-model="msg"
        type="text"
        class="form-control"
        name="engraving"
        aria-describedby="engravingHelp"
        :placeholder="placeholder"
        :class="{ 'is-invalid': errors[0] }"
        :maxlength="maxlength"
        @input="onEmit"
      >
      <div
        v-show="errors[0] "
        class=" invalid-feedback"
      >
        {{ errors[0] }}
      </div>
    </ValidationProvider>
  </div>
</template>

<script>
import { validate } from 'vee-validate'

export default {
  name: 'InputEngraving',
  props: {
    placeholder: { type: String, default: '你的鐫刻' },
    charLimit: { type: Object, required: true },
    value: { type: String, default: '' }
  },
  data () {
    return {
      msg: ''
    }
  },
  computed: {
    maxlength () {
      const ch = this.charLimit.ch
      const en = this.charLimit.en
      return ch > en ? ch : en
    }
  },
  watch: {
    value: {
      handler (newValue) {
        this.msg = newValue
      }
    }
  },
  created () {
    this.msg = this.value
  },
  methods: {
    onEmit () {
      validate(this.msg, `mixedENTW|hasSpecialChar|hasEmoji|checkLength:${this.charLimit.ch},${this.charLimit.en}`).then(result => {
        if (!result.valid) {
          this.$emit('hasError', true)
        } else {
          this.$emit('hasError', false)
        }
      })
      this.$emit('input', this.msg)
    }
  }
}

/*
-只能使用單一語言，不能中英混和
-可以輸入兩行文字(Pencil和Airpods除外)
- For English (30 characters),
- For Chinese (17 characters), airpods: 10, apple pencil: 11
- Allowed:  ` ! @ # $ % ^ & ( ) - = _ + { } | [ ] : ; ' ? , . /
- Not Allowed: ~ \ * " < > , or 表情符號
-
*/

</script>
