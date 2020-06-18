<template>
  <tr>
    <!-- 圖片 -->
    <th scope="row">
      <div>
        <a href=""><img
          :src="info.img"
          alt=""
          @click.prevent
        ></a>
      </div>
    </th>
    <!-- 品名 -->
    <td :class="{ 'text-left': hasEngraving }">
      {{ info.summary }}
      <div
        v-if="hasEngraving"
        class="laser-title-table"
      >
        雷射鐫刻訊息
      </div>
      <div class="laser-content-table">
        <p>{{ info.engraving.msg1 || "" }}</p>
        <p>{{ info.engraving.msg2 || "" }}</p>
      </div>
    </td>
    <!-- 單價 -->
    <td>NT$ {{ localePrice }}</td>
    <!-- 數量 -->
    <td>{{ info.quantity }}</td>
    <!-- 刪除 -->
    <td v-if="editable">
      <button
        class="color-red text-nowrap fas fa-trash-alt"
        @click="editPayment"
      />
    </td>
  </tr>
</template>

<script>
export default {
  name: 'TableRowItem',
  props: {
    info: { type: Object, required: true },
    editable: { type: Boolean, default: true }
  },
  computed: {
    localePrice () {
      return this.info.price.toLocaleString()
    },
    engraving () {
      return this.info.engraving || {}
    },
    hasEngraving () {
      const msg1 = this.engraving.msg1 || ''
      const msg2 = this.engraving.msg2 || ''
      return msg1 !== '' || msg2 !== ''
    }
  },
  methods: {
    editPayment () {
      this.$emit('click', this.$attrs.index)
    }
  }
}
</script>
