<template>
  <!-- 第一台 -->
  <div class="col-md-4 options-area">
    <div class="options-p-img">
      <img
        v-for="(pic, index) in pics"
        :key="index"
        class="img-fluid"
        :class="{ 'd-none': pic !== currentPic }"
        :src="pic"
      >
    </div>
    <div class="options-p-selection">
      <!-- 顏色 -->
      <fieldset v-if="colors.length > 1">
        <legend>選擇 顏色</legend>
        <ul class="selection-content clearfix p-0">
          <ButtonOptionSwatchMac
            v-for="(color, index) in colors"
            :key="index"
            :color="color"
            :current-color="currentColor"
            @click="changeColor(color)"
          />
        </ul>
      </fieldset>
      <p class="note-new pt-4 pb-2">
        全新
      </p>
      <h4>
        {{ item[0].title }}
        <br>
        {{ capacity }}
      </h4>
      <ul class="modelspecs">
        <li
          v-for="(spec, index) in detailSpecs"
          :key="index"
        >
          {{ spec }}
        </li>
      </ul>
      <!-- 點數兌換 -->
      <div class="selection-bouns-content">
        <div class="selection-bouns">
          <div class="price-amount">
            NT$ {{ item[0].price.toLocaleString() }}
          </div>

          <ButtonPrimary
            :text="$t('redeem')"
            @click="onRedeem"
          />
        </div>
        <p>* 價格包括稅</p>
        <p class="note-icon-shopping">
          出貨最快約
          <span class="font-weight-bold text-dark">4-7 個工作天</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'
import ButtonOptionSwatchMac from '@/components/ButtonOption/ButtonOptionSwatchMac'

export default {
  name: 'TabOptionProduct',
  components: { ButtonOptionSwatchMac, ButtonPrimary },
  props: {
    item: { type: Array, required: true },
    colors: { type: Array, required: true }
  },
  data () {
    return {
      currentColor: ''
    }
  },
  computed: {
    pics () {
      const pics = {}
      for (const key in this.item) {
        pics[key] = this.item[key].IMGLink
      }
      return pics
    },
    currentPart () {
      for (const mac of this.item) {
        if (mac.color === this.currentColor) {
          return mac
        }
      }
      return {}
    },
    currentPic () {
      return this.currentPart.IMGLink || ''
    },
    detailSpecs () {
      return this.item[0].modelspecs
    },
    capacity () {
      for (const spec of this.detailSpecs) {
        if (spec.includes('儲存裝置') || spec.includes('硬碟')) return spec
      }
      return ''
    }
  },
  created () {
    this.currentColor = this.item[0].color ? this.item[0].color : ''
  },
  methods: {
    changeColor (event) {
      this.currentColor = event
    },
    onRedeem () {
      this.$emit('click', this.currentPart)
    }
  }
}
</script>
