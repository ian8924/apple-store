<template>
  <li
    class="nav-options"
    @click="onClick"
  >
    <a
      class="nav-link"
      :class="{ active: currentSize === size }"
    >{{ size }} 吋</a>
  </li>
</template>

<script>
export default {
  name: 'TabOptionScreenSize',
  props: {
    size: { type: Number, required: true },
    currentSize: { type: Number, required: true }
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>
