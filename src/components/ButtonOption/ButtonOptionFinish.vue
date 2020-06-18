
<template>
  <ButtonOption
    :is-selected="getState"
    @click="handleClick()"
  >
    <template #swatch>
      <SwatchColor :class="color.replace('(product)', '')" />
    </template>
    <template #text>
      <span>{{ $t(`finish.${text}`) }}</span>
    </template>
  </ButtonOption>
</template>

<script>
import ButtonOption from '@/components/base/Button/ButtonOption'
import SwatchColor from '@/components/base/SwatchColor'
export default {
  name: 'ButtonOptionFinish',
  components: { ButtonOption, SwatchColor },
  props: {
    color: { type: String, required: true },
    text: { type: String, required: true }
  },
  computed: {
    getState () {
      return (
        this.$store.getters[
          `${this.$store.getters.currentSelection.Type}/currentFinish`
        ] === this.text
      )
    }
  },
  methods: {
    handleClick () {
      const currentSelection = this.$store.getters.currentSelection
      const commitName = `${currentSelection.Type}/${currentSelection.product}`
      this.$store.commit(commitName, {
        type: 'finish',
        val: this.text
      })
    }
  }
}
</script>
