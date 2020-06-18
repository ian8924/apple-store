<template>
  <ButtonOption
    :is-selected="getState"
    @click="handleClick()"
  >
    <template #text>
      <span class="option-text">{{ Text_ }}</span>
    </template>
  </ButtonOption>
</template>

<script>
import ButtonOption from '@/components/base/Button/ButtonOption'

export default {
  name: 'ButtonOptionCapacity',
  components: { ButtonOption },
  props: { text: { type: Number, required: true } },
  computed: {
    getState () {
      return (
        this.$store.getters[
          `${this.$store.getters.currentSelection.Type}/currentCapacity`
        ] === this.text
      )
    },
    Text_ () {
      if (parseInt(this.text) < 5) {
        return `${this.text} TB`
      }
      return `${this.text} GB`
    }
  },
  methods: {
    handleClick () {
      const currentSelection = this.$store.getters.currentSelection
      const commitName = `${currentSelection.Type}/${currentSelection.product}`
      this.$store.commit(commitName, {
        type: 'capacity',
        val: this.text
      })
    }
  }
}
</script>
