<template>
  <ButtonOption
    :is-selected="getState"
    @click="handleClick()"
  >
    <template #text>
      <span class="option-text">{{ text }}</span>
    </template>
  </ButtonOption>
</template>

<script>
import ButtonOption from '@/components/base/Button/ButtonOption'

export default {
  name: 'ButtonOptionModel',
  components: { ButtonOption },
  props: { text: { type: String, required: true } },
  computed: {
    getState () {
      return (
        this.$store.getters[
          `${this.$store.getters.currentSelection.Type}/currentModel`
        ] === this.text
      )
    }
  },
  methods: {
    handleClick () {
      const currentSelection = this.$store.getters.currentSelection
      const commitName = `${currentSelection.Type}/${currentSelection.product}`
      this.$store.commit(commitName, {
        type: 'model',
        val: this.text
      })
    }
  }
}
</script>
