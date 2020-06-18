<template>
  <ButtonOption
    :is-selected="getState"
    @click="handleClick()"
  >
    <template #text>
      <span class="option-text">{{ text }} mm</span>
    </template>
  </ButtonOption>
</template>

<script>
import ButtonOption from '@/components/base/Button/ButtonOption'

export default {
  name: 'ButtonOptionCaseSize',
  components: { ButtonOption },
  props: { text: { type: [Number, String], required: true } },
  computed: {
    getState () {
      return (
        this.$store.getters[
          `${this.$store.getters.currentSelection.Type}/currentCaseSize`
        ] === this.text
      )
    }
  },
  methods: {
    handleClick () {
      const currentSelection = this.$store.getters.currentSelection
      const commitName = `${currentSelection.Type}/${currentSelection.product}`
      this.$store.commit(commitName, {
        type: 'caseSize',
        val: this.text
      })
    }
  }
}
</script>
