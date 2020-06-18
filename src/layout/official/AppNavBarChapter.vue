<template>
  <transition name="slide-fade">
    <div
      v-show="animateShow"
      class="chapternav-bar"
    >
      <!-- 在螢幕縮小後，會出現的 nav bar scroller -->
      <transition name="fade">
        <div
          v-show="showScrollerLeft"
          ref="scrollerL"
          class="scroller scroller-left"
          :class="{ 'scroller-watch': currentNavBarChapter === 'watch' }"
          :style="styleObjectScrollerL"
          @click="clickScroller('Left')"
        >
          <i class="fas fa-angle-left" />
        </div>
      </transition>
      <!-- 在螢幕縮小後，會出現的 nav bar scroller -->
      <transition name="fade">
        <div
          v-show="showScrollerRight"
          ref="scrollerR"
          class="scroller scroller-right"
          :class="{ 'scroller-watch': currentNavBarChapter === 'watch' }"
          :style="styleObjectScrollerR"
          @click="clickScroller('Right')"
        >
          <i class="fas fa-angle-right" />
        </div>
      </transition>
      <div
        class="wrapper"
        :class="{ 'wrapper-watch': currentNavBarChapter === 'watch' }"
      >
        <ul
          id="myTab"
          class="nav list"
        >
          <div
            ref="navWrapper"
            class="list_b"
          >
            <ListItemNavBarChapter
              v-for="(Product, index) in navbarChapter"
              :key="index"
              :product-infos="Product"
            />
          </div>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import ListItemNavBarChapter from '@/components/NavbarItem/ListItemNavBarChapter'
import { TweenMax } from 'gsap'
export default {
  name: 'AppNavBarChapter',
  components: { ListItemNavBarChapter },
  data: () => {
    return {
      showScrollerRight: false,
      showScrollerLeft: false,
      screenWidth: document.body.clientWidth,
      styleObjectScrollerR: {},
      styleObjectScrollerL: {},
      animateShow: false
    }
  },
  computed: {
    navbarChapter () {
      if (this.currentNavBarChapter) {
        return this.$store.state[this.currentNavBarChapter].chapterNavBar
      }
      return []
    },
    currentNavBarChapter () {
      return this.$store.getters.showNavBarChapter
    }
  },
  watch: {
    screenWidth (val) {
      this.handleScreenWidth(val)
    }
  },
  // 不能用 mounted: () => {}的寫法，因為 arrow function 沒有 define this
  // https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks
  mounted () {
    this.animateShow = true
    const vm = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        vm.screenWidth = window.screenWidth
      })()
    }
    vm.handleScreenWidth(vm.screenWidth, true)
  },
  beforeDestroy () {
    window.onresize = null
  },
  methods: {
    handleScreenWidth: function (val, isMounted = false) {
      // scrollWidth 是 element 實際的寬度
      // clientWidth 是 element 可視的寬度
      // https://www.cnblogs.com/kongxianghai/p/4192032.html
      var navProdsWidth = this.$refs.navWrapper.clientWidth
      // 因為 mounted 專案
      if (isMounted) {
        navProdsWidth = 702
      }
      // 判斷navbar寬度，如果螢幕寬度 < nav bar 寬度，顯示右邊的 scroll
      if (val < navProdsWidth) {
        this.showScrollerRight = true
      } else {
        this.showScrollerRight = false
      }
      const navProdsLeft = this.$refs.navWrapper.parentNode.getBoundingClientRect()
        .left
      // 判斷 nav bar 左邊的位置，如果位置消失在螢幕，顯示左邊的 scroll

      if (navProdsLeft < 0) {
        this.showScrollerLeft = true
        TweenMax(this.$refs.navWrapper.parentNode, 0.5, {
          css: { left: '0px' }
        })
      } else {
        this.showScrollerLeft = false
      }
    },
    clickScroller (event) {
      // console.log(event);
      const scrollBarWidths = this.$refs.scrollerR.scrollWidth
      var navlistele = this.$refs.navWrapper.parentNode // .list element
      var navPositionLeft = navlistele.getBoundingClientRect().left // getLeftPosi()
      var viewVisibleWidth = navlistele.parentNode.clientWidth // .wrapper element clientWidth = $('.wrapper').outerWidth()
      var navWidth = navlistele.scrollWidth // widthOfList()
      const calNewPosition =
        viewVisibleWidth - navWidth - navPositionLeft - scrollBarWidths
      // animation control
      var endPosition
      if (event === 'Right') {
        endPosition = calNewPosition + 'px'
      } else {
        endPosition = '0px'
      }
      // https://blog.usejournal.com/vue-js-gsap-animations-26fc6b1c3c5a
      TweenMax(navlistele, 0.5, {
        css: { left: endPosition }
      })
      this.showScrollerRight = !this.showScrollerRight
      this.showScrollerLeft = !this.showScrollerLeft
    }
  }
}
</script>
<style scoped>
.wrapper {
  margin-left: 20px;
  margin-right: 20px;
}
.wrapper-watch,
.scroller-watch {
  height: 120px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<style >
.wrapper-watch .chapternav-label {
  height: 1.5rem;
}
</style>
