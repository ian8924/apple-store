<template>
  <li>
    <a
      href=""
      @click.prevent="$emit('click')"
    >
      <div class="product-item">
        <div class="product-img">
          <img
            class="img-fluid"
            :src="reprItem.IMGLink"
            alt=""
          >
        </div>
        <div class="product-info-list">
          <!-- <div class="product-link">{{ reprItem.color }}</div> -->
          <div class="product-link">{{ reprItem.title }}</div>
          <!-- <div class="product-link">{{ reprItem.name }}</div> -->
          <!-- <div class="product-link">{{ reprItem.model }}</div> -->

          <div class="price-amount">
            NT$ {{ reprItem.price.toLocaleString() }}<span /><sup />
          </div>
        </div>
      </div>
    </a>
  </li>
</template>
<script>
export default {
  name: 'ListItemAccessories',
  props: { item: { type: Array, required: true } },
  computed: {
    reprItem () {
      return this.item[0]
    }
  }
}
</script>
