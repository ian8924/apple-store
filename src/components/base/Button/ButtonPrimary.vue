<template>
  <button
    class="btn-base primary-btn"
    :disabled="disabled"
    @click="onclick"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ButtonPrimary',
  props: {
    text: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onclick () {
      this.$emit('click')
    }
  }
}
</script>
<style scoped>
/*按鈕 按鈕 按鈕 按鈕*/
.btn-base {
  color: #000;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5em;
  padding: 9px 24px;
  min-width: 120px;
  border: 1px solid #b5b5b7;
  border-radius: 4px;
  margin-bottom: 30px;
  cursor: pointer;
  font-family: 'Microsoft JhengHei', sans-serif, 'Noto Sans TC';
  text-align: center;
  white-space: nowrap;
  text-decoration: none;
}
.btn-base:hover,
.btn-base:focus,
.btn-base.disabled {
  background: #b23e35;
  z-index: 5;
}
.btn-base:active {
  box-shadow: 0 1px 0 #fff, inset 0 0 9px rgba(0, 0, 0, 0.5);
}
.btn-base.primary-text-btn {
  color: #00b897;
}
.btn-base.btn-small {
  padding: 4px 15px;
}
.btn-base.btn-large {
  padding: 13px 15px;
}
.btn-base.primary-btn {
  background-color: #00b897;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  border: 1px solid #00967b;
  color: #ffffff;
  text-shadow: 0px 1px 0px #00967b;
}
.btn-base.primary-btn:hover,
.btn-base.primary-btn:focus {
  background-color: #00967b;
}
.btn-base.primary-btn:active {
  background-color: #00967b;
  border: 1px solid #00967b;
}
.btn-base.primary-btn:disabled {
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  color: #d0d0d0;
  text-shadow: 0px 1px 0px #ffffff;
}
</style>
