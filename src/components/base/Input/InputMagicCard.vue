<template>
  <div>
    <label for="Card">請輸入信用卡卡號</label>
    <ValidationProvider
      v-slot="{ errors }"
      name="Card"
      rules="required|credit"
    >
      <input
        ref="input"
        v-model="oberveValue"
        type="tel"
        class="form-control"
        aria-describedby="CardHelp"
        placeholder="請輸入信用卡卡號"
        maxlength="19"
        :class="{
          'is-invalid': errors[0]
        }"
      >
      <div
        v-show="errors[0]"
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
  name: 'InputMagicCard',
  props: {
    cardNum: { type: String, default: '' }
  },
  data: () => {
    return {
      magicCard: null
    }
  },
  computed: {
    oberveValue: {
      get () {
        return this.magicCard
      },
      set (value) {
        value = (value || '').replace(/\D/g, '')
        value = value.length > 4 ? value.replace(/(\d{4})/, '$1 ') : value
        value = value.length > 9 ? value.replace(/(\d{4}) (\d{4})/, '$1 $2 ') : value
        this.magicCard = value.length > 14 ? value.replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ') : value
        validate(this.magicCard, 'credit||required').then(result => {
          if (result.valid) {
            this.$emit('input', this.magicCard.replace(/\D/g, ''))
          } else {
            this.$emit('input', null)
          }
        })
      }
    }
  },
  watch: {
    oberveValue: {
      handler () {
        this.$refs.input.selectionStart = this.oberveValue.length
        this.$refs.input.selectionEnd = this.oberveValue.length
      }
    }
  },
  mounted () {
    this.magicCard = this.cardNum
  }
}
</script>
