<template>
  <span class="countdown d-inline-block">{{ rmin }} : {{ rsec }}</span>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    trigger: { type: Boolean, default: false }
  },
  data: () => {
    return { settime: 0, min: 5, sec: 0 }
  },
  computed: {
    rmin () {
      return Math.floor((this.settime / 60) % 60)
    },
    rsec () {
      const sec_ = Math.ceil((this.settime % 60) / 1)
      return sec_ >= 10 ? sec_ : '0' + sec_
    }
  },
  watch: {
    trigger () {
      if (!this.trigger) return
      this.setTimer()
    }
  },
  mounted () {
    this.setTimer()
  },
  beforeDestroy () {
    window.clearInterval(this.timer_)
  },
  methods: {
    setTimer () {
      if (process.env.VUE_APP_VERIFT_TIME || false) {
        const configtime = process.env.VUE_APP_VERIFT_TIME.split(',').map(val =>
          parseInt(val)
        )
        this.min = configtime[0]
        this.sec = configtime[1]
      }
      this.settime = this.min * 60 + this.sec
      // https://medium.com/byteconf/building-a-pomodoro-timer-with-vue-js-on-codepen-ec9d1d53e833
      // https://forum.vuejs.org/t/vue-clearinterval/34398
      const vm = this
      vm.timer_ = window.setInterval(() => {
        if (vm.settime > 0) {
          vm.settime -= 1
          return
        }
        vm.$emit('timeout')
        window.clearInterval(vm.timer_)
      }, 1000)
    }
  }
}
</script>
<style scoped>
.countdown {
  padding: 0.3rem 0.8rem;
  border: 1px solid rgba(0, 204, 177, 0.5);
  border-radius: 20px;
  background-color: #00b897;
  color: #fff;
  margin-left: 0.5rem;
}
</style>
