<template>
  <a
    :href="decoratedRoute"
    class="item-list-link"
    @click.prevent="pushLink(decoratedRoute)"
  >
    <div class="item-landing-m">
      <div class="item-list-m">
        <div class="item-pic">
          <img
            class="img-fluid"
            :src="heroInfo.image"
            alt
          >
        </div>
        <h4 class="item-name">
          {{ heroInfo.name }} <br v-if="subName2">
          {{ subName2 }}
        </h4>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'SectionHeroM',
  props: { heroInfo: { type: Object, required: true } },
  computed: {
    decoratedRoute () {
      if (Object.prototype.hasOwnProperty.call(this.heroInfo, 'route')) {
        return this.heroInfo.route
      }
      const category = this.$store.getters['product/currentProductList']
      return `shop/buy-${category}/${this.heroInfo.name}${this.subName2}`
        .toLowerCase()
        .replace(/\s/g, '-')
    },
    subName2 () {
      return this.heroInfo.subName2 || '' ? ` ${this.heroInfo.subName2}` : ''
    }
  },
  methods: {
    pushLink (event) {
      this.$router.push(event)
    }
  }
}
</script>
