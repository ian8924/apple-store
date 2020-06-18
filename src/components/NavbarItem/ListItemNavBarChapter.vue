<template>
  <li class="chapternav-item">
    <router-link
      class="chapternav-link"
      :to="buyProductRoute ? `/${this.$i18n.locale}${buyProductRoute}` : '#'"
    >
      <figure
        class="chapternav-icon"
        :style="productInfos.prodImgStyle"
      />
      <span
        class="chapternav-label"
      >{{ productInfos.prodName }}<br v-if="subName2">{{ subName2
      }}<span
        v-if="productInfos.subName || false"
        class="small-caps"
      >{{ productInfos.subName }}
      </span>
      </span>
      <span
        v-if="productInfos.isNew || false"
        class="chapternav-new"
      >全新</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'ListItemNavBarChapter',
  props: { productInfos: { type: Object, default: () => ({}) } },
  computed: {
    buyProductRoute () {
      // 判斷 link a href 是動態產生還是由 productInfos 提供
      const info = this.productInfos

      // 使用 productInfos 提供的 link
      if (info.route) {
        return info.route
      }
      const productName = (
        info.prodName +
        (info.subName || '') +
        (this.subName2 !== '' ? ` ${this.subName2}` : '')
      ).replace(/\s/g, '-')
      // 動態產生 Shop link ，主要是配件類的商品
      var productType
      try {
        productType = this.$route.path
          .match(/buy-[a-zA-Z]*/)[0]
          .replace('buy-', '')
      } catch (e) {
        productType = this.$store.getters['product/currentProductList']
      }

      return `/shop/buy-${productType}/${productName}`.toLowerCase()
    },
    subName2 () {
      const info = this.productInfos
      return info.subName2 || ''
    }
  }
  /*
  productInfos:
  1. 產品名稱 prodName
  2. 產品名稱下標 subName || false
  3. 全新標籤 isNew ||false
  4. 客製化 style prodImgStyle
  */
}
</script>
