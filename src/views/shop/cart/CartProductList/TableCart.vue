<template>
  <table class="table cart-list text-center">
    <thead>
      <tr class="cart-item-w">
        <th scope="col">
          商品
        </th>
        <th scope="col">
          品名
        </th>
        <th scope="col">
          單價
        </th>
        <th scope="col">
          數量
        </th>
        <th
          v-if="editable"
          scope="col"
        >
          刪除
        </th>
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'TableCart',
  props: {
    editable: {
      type: Boolean,
      default: true
    }
  }
}
</script>
