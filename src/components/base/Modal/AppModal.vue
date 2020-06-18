<template>
  <transition name="fade">
    <div
      v-if="showModal"
      class="modal-mask sticky-top"
      @click.self="$emit('close')"
      @keyup.esc="$emit('close')"
    >
      <div
        v-if="showModal"
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        :class="{ 'modal-xl': modalSizeXL }"
        role="document"
      >
        <transition name="slidey-fade">
          <div class="modal-content">
            <!-- 標題 -->
            <div class="modal-header">
              <button
                type="button"
                class="close"
                @click="$emit('close')"
                @keyup.esc="$emit('close')"
              >
                <span>&times;</span>
              </button>
            </div>
            <!-- 內文 -->
            <div
              class="modal-body"
              :class="bodyClass"
            >
              <div class="text-center">
                <img
                  v-if="showLogo"
                  src="@/assets/DBS_logo_b.png"
                  class="img-fluid"
                  alt=""
                >
                <h3
                  v-if="showRemindTitle"
                  id="Order_Confirm"
                  class="modal-title mt-2 mb-3"
                >
                  提醒您
                </h3>
                <slot name="title" />
              </div>
              <slot />
            </div>
            <!-- 頁腳 -->
            <div class="modal-footer justify-content-center">
              <slot name="button" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    showRemindTitle: { type: Boolean, default: true },
    showModal: { type: Boolean, default: false },
    showLogo: { type: Boolean, default: true },
    modalSizeXL: { type: Boolean, default: false },
    bodyClass: { type: String, default: '' }
  },
  data: () => {
    return {}
  },
  watch: {
    showModal () {
      if (this.showModal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  },
  destroyed () {
    document.body.style.overflow = 'auto'
  }
}
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}
.modal-dialog-scrollable .modal-content {
  max-height: calc(100vh - 1rem) !important;
}

.slidey-fade-enter {
  top: -100px;
  opacity: 0;
}
.slidey-fade-enter-to {
  top: 0px;
  opacity: 1;
}
.slidey-fade-leave {
  top: 0px;
  opacity: 1;
}
.slidey-fade-leave-to {
  top: 100px;
  opacity: 0;
}
.slidey-fade-enter-active {
  transition-property: top, opacity;
  transition-duration: 0.5s;
  transition-timing-function: ease;
}
.slidey-fade-leave-active {
  transition-property: top, opacity;
  transition-duration: 0.5s;
  transition-timing-function: ease;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
