
<template>
  <main>
    <div class="container-fluid">
      <div class="row customize-content my-4">
        <div class="col-md-3 text-center">
          <div
            class="nav flex-column nav-pills provision"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              v-for="(val, index) in listTC"
              :key="index"
              class="nav-link"
              :class="{ active: currentTC === val }"
              data-toggle="pill"
              href="#"
              role="tab"
              :aria-controls="`v-pill-${val}`"
              :aria-selected="currentTC === val"
              @click="changeTC(val)"
            >
              {{ $t(`copywriting.footer.${val}`) }}
            </a>
          </div>
        </div>
        <div class="col-md-9 col-sm-12 col-12">
          <div
            id="v-pills-tabContent"
            class="tab-content"
          >
            <transition
              name="component-fade"
              mode="out-in"
            >
              <!--  eslint-disable vue/no-v-html  -->
              <div
                :key="currentTC"
                class="tab-pane fade show active"
                role="tabpanel"
                aria-labelledby="v-pills-a-tab"
                v-html="currentTCContent"
              />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { listTC, TCContent } from '../stores/config/config.tc'
const listTC_ = listTC.filter(tc => TCContent[tc] || false)
export default {
  name: 'TnCAll',
  data () {
    return {
      listTC: listTC_,
      currentTC: listTC[0],
      currentTCContent: TCContent[listTC[0]]
    }
  },
  computed: {
    show () {
      return this.$route.query.show || false
    }
  },
  watch: {
    show () {
      this.changeTC(this.show)
    }
  },
  created () {
    this.changeTC(this.show)
  },
  methods: {
    changeTC (event) {
      this.currentTC = event
      this.currentTCContent = TCContent[event]
      if (!TCContent[event]) {
        this.$router.push({ name: event })
      }
    }
  }
}
</script>

<style scpoed>
.chapternav-icon {
  width: 48px;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
