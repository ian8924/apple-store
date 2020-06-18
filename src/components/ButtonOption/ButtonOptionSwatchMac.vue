<template>
  <li
    class="selection-item-as"
    @click="handleClick()"
  >
    <div><input type="radio"></div>
    <div
      class="selection-item-details-as"
      :class="{ selected: color === currentColor }"
    >
      <label
        :for="color"
        class="colornav-link"
      >
        <div
          class="swatch"
          :class="color_"
        />
        <span class="colornav-label mt-1">{{ $t(`finish.${color_}`) }}</span>
      </label>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ButtonOptionSwatchMac',
  props: {
    color: { type: String, required: true },
    currentColor: {
      type: String,
      required: true
    }
  },
  computed: {
    color_ () {
      return this.color.toLowerCase().replace(/\s/g, '-')
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
