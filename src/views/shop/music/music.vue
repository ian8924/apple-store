<template>
  <div>
    <main>
      <SectionHero
        v-for="(hero, index) in sectionHeros"
        :key="index"
        :hero-info="hero"
      />
      <!--Mobile -->
      <SectionHeroM
        v-for="prod in sectionHerosM"
        :key="prod.id"
        :hero-info="prod"
      />
    </main>
  </div>
</template>

<script>
import SectionHeroM from '@/components/SectionHero/SectionHeroM'
import SectionHero from '@/components/SectionHero/SectionHeroMusic'

import {
  sectionHerosM,
  sectionHerosMusic
} from '@/stores/config/config.music'

export default {
  name: 'Music',
  components: { SectionHeroM, SectionHero },
  data: () => {
    return { sectionHerosM, sectionHerosMusic }
  },
  computed: {
    sectionHeros () {
      return this.sectionHerosMusic.relatedProductList
    }
  },
  mounted () {
    this.$store.commit('product/setCurrentProductList', 'music')
  },
  beforeDestroy () {
    this.$store.commit('product/setCurrentProductList', '')
  }
}
</script>
