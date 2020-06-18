<template>
  <a
    href="#"
    @click.prevent="onClick"
  >
    <div class="row info-list m-0">
      <div class="col-10 align-items-center ">
        <p class="h3">{{ userInfo.type }}</p>
        <p>{{ val_ }}</p>
      </div>
      <div class="col-2 text-right">
        <span
          v-if="!userInfo.notEditable"
          class="arrow arrow-right"
        />
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'ListItemInfoUser',
  props: {
    userInfo: { type: Object, required: true }
  },
  computed: {
    val_ () {
      if (this.userInfo.type === '收件人地址') {
        const data = this.userInfo.val
        return `${data.city}${data.area}${data.address}`
      }
      return this.userInfo.val
    }
  },
  methods: {
    onClick () {
      if (this.userInfo.notEditable || false) return
      this.$emit('click')
    }
  }
}
</script>
