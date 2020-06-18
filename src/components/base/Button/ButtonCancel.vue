<template>
  <button
    class="btn-base btn-cancel"
    :disabled="disabled"
    @click="onclick"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ButtonCancel',
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
.btn-cancel {
  margin-right: 5rem;
  border: 0;
  background: none;
}
.btn-cancel:hover {
  color: #00b897;
}
.btn-base.btn-cancel:hover {
  background: #d7d7d7;
  background: -webkit-linear-gradient(#fff, #fff);
  background: -moz-linear-gradient(#fff, #fff);
  background-image: linear-gradient(#fff, #fff);
}
.btn-base.btn-cancel:active {
  box-shadow: 0 1px 0 #fff, inset 0 0 9px rgba(255, 255, 255, 0.5);
}
.btn-cancel:active {
  color: #00967b;
}
@media (max-width: 767px) and (min-width: 320px) {
 .btn-cancel {
    margin-right: 2rem;
  }
}
@media (max-width: 420px) and (min-width: 320px) {
   .btn-cancel {
    margin-right: 0;
    padding: 0 2rem;
  }
}
</style>
