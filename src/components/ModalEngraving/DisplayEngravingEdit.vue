<template>
  <div>
    <div
      v-if="!hasLaserMSG"
      class="line mb-5"
    >
      <div class="laser-title">
        <a
          href="#"
          @click="openLaserModal"
        >加上雷射鐫刻</a>
      </div>
      <div class="laser-content">
        <p>鐫刻上你的姓名、縮寫，或是電話號碼，免額外付費。Apple 獨家提供。</p>
      </div>
    </div>
    <div
      v-else
      class="line mb-5"
    >
      <div class="laser-title">
        你的雷射鐫刻訊息
        <a
          href="#"
          @click="openLaserModal"
        >編輯</a>
      </div>
      <div class="laser-content">
        <p>{{ laserMSG.msg1 }} </p>
        <p>{{ laserMSG.msg2 }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisplayEngravingEdit',
  props: {
    laserMSG: {
      type: Object,
      default: () => {
        return { msg1: '', msg2: '' }
      }
    }
  },
  computed: {
    hasLaserMSG () {
      return this.laserMSG.msg1 !== ''
    }
  },
  methods: {
    openLaserModal () {
      this.$emit('openLaserModal')
    }
  }
}
</script>
