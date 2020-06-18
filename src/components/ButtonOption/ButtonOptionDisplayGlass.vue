<template>
  <ButtonOption
    :is-selected="getState"
    @click="handleClick()"
  >
    <template #text>
      <span class="option-text">{{ $t(`displayGlass.${text}`) }}</span>
    </template>
  </ButtonOption>
</template>

<script>
import ButtonOption from '@/components/base/Button/ButtonOption'

export default {
  name: 'ButtonOptionDisplayGlass',
  components: { ButtonOption },
  props: { text: { type: String, required: true } },
  computed: {
    getState () {
      return (
        this.$store.getters[
          `${this.$store.getters.currentSelection.Type}/currentDisplayGlass`
        ] === this.text
      )
    }
  },
  methods: {
    handleClick () {
      const currentSelection = this.$store.getters.currentSelection
      const commitName = `${currentSelection.Type}/${currentSelection.product}`
      this.$store.commit(commitName, {
        type: 'displayGlass',
        val: this.text
      })
    }
  }
}
</script>
