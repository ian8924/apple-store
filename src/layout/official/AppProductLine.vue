<template>
  <div class="container-fluid nav-container">
    <nav class="navbar navbar-expand-lg navbar-light nav-global">
      <a
        class="navbar-brand mr-5 py-3"
        :href="`/${this.$i18n.locale}`"
      >Apple</a>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse"
        :class="{show:menuShow}"
      >
        <ul class="navbar-nav w-100 justify-content-between m-0">
          <li
            v-for="Line in productLine"
            :key="Line.id"
            class="nav-item"
          >
            <a
              class="nav-link"
              :class="{
                disabled: Line.isDisable,
                action:isActive(Line)
              }"
              :href="Line.href"
              @click.prevent="pushLink(Line.href)"
            >{{ Line.name }}</a>
          </li>
          <li
            class="nav-item dropdown pr-3"
          >
            <router-link
              id="navbarDropdownMenuLink"
              class="nav-link"
              :to="{name: 'shop bag'}"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              @click.native="disableMenu"
            >
              <i class="fas fa-shopping-bag" />
            </router-link>
            <DropdownBag v-if="false" />
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import DropdownBag from '@/components/NavbarItem/DropdownBag'

const productName = [
  'Mac',
  'iPhone',
  'iPad',
  'Watch',
  'TV',
  'Music',
  '配件'
]

const productHref = [
  '/mac',
  '/iphone',
  '/ipad',
  '/watch',
  '/tv',
  '/music',
  '/accessories?category=iPhone&filter='
]

export default {
  name: 'AppProductLine',
  components: { DropdownBag },
  data () {
    return {
      isLocal: process.env.VUE_APP_IS_LOCAL === 'true',
      menuShow: false
    }
  },
  computed: {
    productLine () {
      const productLine = []
      for (let index = 0; index < productName.length; index++) {
        const element = productName[index]
        const element2 = '/' + this.$i18n.locale + productHref[index]
        const isDisable = productHref[index] === '#'
        productLine.push({ name: element, href: element2, isDisable })
      }
      return productLine
    }
  },
  methods: {
    pushLink (event) {
      this.menuShow = false
      this.$router.push(event)
    },
    disableMenu () {
      this.menuShow = false
    },
    toggleMenu () {
      this.menuShow = !this.menuShow
    },
    isActive (Line) {
      if (Line.name === '配件') {
        return this.$route.path.includes('accessories')
      }
      return this.$route.path.includes(Line.name.toLowerCase())
    }
  }
}
</script>
