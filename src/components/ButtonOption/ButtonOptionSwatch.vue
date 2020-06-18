<template>
  <li
    class="selection-item-as"
    @click="handleClick()"
  >
    <div><input type="radio"></div>
    <div
      class="selection-item-details-as"
      :class="{ selected: getState }"
    >
      <label
        for=""
        class="colornav-link"
      >
        <div class="swatch">
          <img
            class="swatch-img"
            :src="swatch[color]"
            alt=""
            width="32"
            height="32"
          >
        </div>
        <span class="colornav-label">{{ $t(`bandColor.${text}`) }}</span>
      </label>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ButtonOptionSwatch',
  props: {
    color: { type: String, required: true },
    text: { type: String, required: true },
    swatch: { type: Object, required: true }
  },
  computed: {
    getState () {
      return (
        this.$store.getters[
          `${this.$store.getters.currentSelection.Type}/currentColor`
        ] === this.text
      )
    }
  },
  methods: {
    handleClick () {
      const currentSelection = this.$store.getters.currentSelection
      const commitName = `${currentSelection.Type}/${currentSelection.product}`
      this.$store.commit(commitName, {
        type: 'color',
        val: this.text
      })
    }
  }
}
</script>
