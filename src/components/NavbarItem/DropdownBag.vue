<template>
  <div
    class="dropdown-menu dropdown-menu-right"
    aria-labelledby="navbarDropdownMenuLink"
  >
    <ul class="dropdown-cart">
      <li>
        <a
          class="dropdown-item"
          @click="pushLink(`/${$i18n.locale}/shop/bag`)"
        >購物袋 {{ currentItemCount ? ` (${currentItemCount})` : "" }}</a>
      </li>
      <li>
        <a
          class="dropdown-item"
          @click="pushLink(`/${$i18n.locale}/shop/order`)"
        >確認付款資訊</a>
      </li>
      <li>
        <a
          class="dropdown-item"
          @click="pushLink(`/${$i18n.locale}/shop/complete`)"
        >訂單完成</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DropdownBag',
  computed: {
    currentItemCount () {
      return this.$store.getters['cart/listProductinCart'].length
    }
  },
  methods: {
    pushLink (event) {
      this.$router.push(event)
    }
  }
}
</script>
