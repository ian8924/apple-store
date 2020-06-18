<template>
  <AppModal
    :show-modal="showModal"
    :show-logo="false"
    :show-remind-title="false"
    :modal-size-x-l="true"
    body-class="px-0"
    @close="$emit('close')"
  >
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 text-center px-0">
          <h4>說出你的心意。</h4>
          <div
            class="laser-img"
            :class="{
              'text-left': isApplePencil,
              'bg-f2': isAirPods,
              'bg-ff': isiPod
            }"
          >
            <img
              v-if="false"
              src="https://www.apple.com/tw/shop/preview/engrave/PTXN2TA/A?th=%E4%BD%A0%E7%9A%84%E9%90%AB%E5%88%BB&tl=%E5%9C%A8%E6%AD%A4%E3%80%82&s=1"
              class="img-fluid"
              alt="ipad"
            >
            <img
              v-if="false"
              src="https://www.apple.com/tw/shop/preview/engrave/PWP22TA/A?th=%E4%BD%A0%E7%9A%84%E9%90%AB%E5%88%BB&s=1"
              class="img-fluid"
              alt="airpods"
            >
            <img
              v-if="false"
              src="https://www.apple.com/tw/shop/preview/engrave/PVHR2TA/A?s=1&th=%E4%BD%A0%E7%9A%84%E9%90%AB%E5%88%BB&tl=%E5%9C%A8%E6%AD%A4%E3%80%82"
              class="img-fluid"
              alt="ipod"
            >
            <img
              v-if="false"
              src="https://www.apple.com/tw/shop/preview/engrave/PU8F2TA/A?th=%E4%BD%A0%E7%9A%84%E9%90%AB%E5%88%BB&s=1"
              class="img-fluid"
              alt="pencil"
            >
            <img
              v-if="true"
              :src="imgSrc"
              class="img-fluid"
            >
          </div>
        </div>
        <div class="col-md-8 ml-auto mr-auto mt-5">
          <p>
            請務必確定拼字正確，因為雷射鐫刻一旦刻上就無法修改。有雷射鐫刻的產品運送日期可能會延後。
          </p>
          <form @submit.prevent>
            <InputEngraving
              v-model="msg1"
              :placeholder="hasLine2 ? '雷射鐫刻內容第一行。' : '你的鐫刻'"
              :char-limit="charLimit"
              @hasError="hasError1 = $event"
            />
            <InputEngraving
              v-if="hasLine2"
              v-model="msg2"
              placeholder="第二行（非必填）"
              :char-limit="charLimit"
              @hasError="hasError2 = $event"
            />
          </form>
        </div>
        <div class="col-12 text-center">
          <button
            class="color-gold"
            @click="removeEngraving"
          >
            移除雷射鐫刻訊息
          </button>
        </div>
      </div>
    </div>
    <template #button>
      <ButtonCancel
        text="取消"
        @click="cancelEdit"
      />
      <ButtonPrimary
        text="儲存"
        @click="comfirmEdit"
      />
    </template>
  </AppModal>
</template>

<script>
import AppModal from '@/components/base/Modal/AppModal'
import ButtonCancel from '@/components/base/Button/ButtonCancel'
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'
import InputEngraving from './InputEngraving'
import api from '@/stores/api/productinfo'

export default {
  name: 'ModalEngraving',
  components: { AppModal, ButtonCancel, ButtonPrimary, InputEngraving },
  props: {
    laserMSG: { type: Object, required: true },
    showModal: { type: Boolean, default: false },
    item: { type: Object, required: true }
  },
  data () {
    return {
      msg1: '',
      msg2: '',
      msg1HasError: false,
      msg2HasError: false
    }
  },
  computed: {
    imgSrc () {
      if (this.isAirPods || this.isApplePencil) {
        return api.getEngravingImg(
          this.item.partNumber,
          this.msg1 ? this.msg1 : '你的鐫刻',
          false
        )
      }
      return api.getEngravingImg(
        this.item.partNumber,
        this.msg1 || this.msg2 ? this.msg1 : '你的鐫刻',
        this.msg1 || this.msg2 ? this.msg2 : '在此。',
        true
      )
    },
    hasLine2 () {
      return this.isiPad || this.isiPod
    },
    isApplePencil () {
      return this.item.summary.includes('Apple Pencil')
    },
    isAirPods () {
      return this.item.summary.includes('AirPods')
    },
    isiPad () {
      return this.item.summary.includes('iPad')
    },
    isiPod () {
      return this.item.summary.includes('iPod touch')
    },
    charLimit () {
      const configLimit = {
        isAirPods: { en: 15, ch: 10 },
        isApplePencil: { en: 15, ch: 11 },
        isiPod: { en: 26, ch: 17 },
        isiPad: { en: 30, ch: 12 }
      }
      const key = this.isAirPods
        ? 'isAirPods'
        : this.isApplePencil
          ? 'isApplePencil'
          : this.isiPad
            ? 'isiPad'
            : 'isiPod'
      return configLimit[key]
    },
    hasError1: {
      get () {
        return this.msg1HasError
      },
      set (value) {
        this.msg1HasError = value
      }
    },
    hasError2: {
      get () {
        return this.msg2HasError
      },
      set (value) {
        this.msg2HasError = value
      }
    }
  },
  mounted () {
    this.msg1 = this.laserMSG.msg1
    this.msg2 = this.laserMSG.msg2
  },
  created () {
    if (this.item.engraving) {
      this.msg1 = this.item.engraving.msg1 || ''
      this.msg2 = this.item.engraving.msg2 || ''
    }
  },
  methods: {
    removeEngraving () {
      this.msg1 = ''
      this.msg2 = ''
      this.hasError1 = false
      this.hasError2 = false
    },
    comfirmEdit () {
      const msg1 = this.msg1
      const msg2 = this.msg2
      // 第一行沒值 第二行有值時 無法通過
      if (!this.msg1 && this.msg2) { return }
      if (this.hasError1 || this.hasError2) { return }
      this.$emit('changeLaserMSG', {
        msg1,
        msg2
      })
      this.cancelEdit()
    },
    cancelEdit () {
      this.$emit('close')
    }
  }
}
</script>

<style>
.bg-ff {
  background-color: #ffffff !important;
}
</style>
