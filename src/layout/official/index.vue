<template>
  <div class="wrap">
    <div class="content">
      <AppHeader />
      <!-- nav 全系列產品列表 -->
      <AppProductLine />
      <!-- chapter nav 單系列所有產品列表 -->
      <AppNavBarChapter v-if="showChapter" />
      <router-view v-show="!this.$store.getters.waitServerResponse_" />
      <LoadingSpinner
        v-if="this.$store.getters.waitServerResponse_"
        class="define-size"
      />
    </div>
    <!-- <AppFooter /> -->
    <link
      href="https://www.freeliving.com.tw/_include/footer_brands_apple.css"
      rel="stylesheet"
      type="text/css"
    >
    <div>
      <AppFooterL2 />
      <AppFooterL3 />
    </div>
  </div>
</template>

<script>
import AppHeader from './AppHeader'
// import AppFooter from './components/baselayout/AppFooter'
import AppFooterL2 from './AppFooterL2'
import AppFooterL3 from './AppFooterL3'
import AppProductLine from './AppProductLine.vue'
import AppNavBarChapter from './AppNavBarChapter'
import LoadingSpinner from '@/components/base/LoadingSpinner'

export default {
  name: 'Official',
  components: {
    AppHeader,
    // AppFooter,
    AppFooterL2,
    AppFooterL3,
    AppProductLine,
    AppNavBarChapter,
    LoadingSpinner
  },
  data () {
    return {
      showChapter: false
    }
  },
  computed: {
    navbarChapter () {
      const showNavBarChapter = this.$store.getters.showNavBarChapter
      if (showNavBarChapter) {
        return this.$store.state[showNavBarChapter].chapterNavBar
      }
      return []
    }
  },
  watch: {
    navbarChapter () {
      this.showChapter = false
    }
  },
  created () {
    this.$store.dispatch('member/checkSignin')
  },
  updated () {
    this.showChapter = this.$store.getters.showNavBarChapter
  }
}
</script>

<style >
    /* layout css由此引入 */
    @import url('../../assets/css/project.css');
</style>
