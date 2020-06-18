<template>
  <div class="tab-content">
    <div class="tab-pane fade show active">
      <div
        class="row"
        :class="bindClass"
      >
        <div class="col-12">
          <h4 v-if="title">
            {{ title }}
          </h4>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabContentMac',
  props: {
    title: { type: String, required: true },
    productCount: { type: Number, default: 0 }
  },
  computed: {
    bindClass () {
      return this.productCount > 3 ? '' : 'd-flex justify-content-center'
    }
  }
}
</script>
