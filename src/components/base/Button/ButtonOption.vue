<template>
  <div
    class="col-12 col-sm-12 col-md-6 selection-item"
    :class="{ 'pr-3': isPaddingRight }"
    @click="$emit('click')"
  >
    <div><input type="radio"></div>
    <div
      class="selection-item-details"
      :class="{ selected: isSelected }"
    >
      <label for>
        <!-- 顏色類別 button 圖標 -->
        <!-- <div v-if="swatch" class="swatch" :class="color"></div> -->
        <slot name="swatch" />
        <slot name="text" />
      </label>
    </div>
  </div>
</template>

<script>
/*
此元件包含的功能
1. 選擇狀態的 class 判段
2. 是否有
*/
export default {
  name: 'ButtonOption',
  props: { isSelected: { type: Boolean, default: false } },
  data: () => {
    return {
      window: {
        width: 0,
        height: 0
      }
    }
  },
  computed: {
    // RWD 調整 Button 置中
    isPaddingRight () {
      if (this.window.width < 426) {
        return false
      }
      return true
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      this.window.width = window.innerWidth
    }
  }
}
</script>
