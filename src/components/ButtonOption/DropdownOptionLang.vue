<template>
  <form @submit.prevent>
    <div class="form-group">
      <label for="FormControlSelect">語言</label>
      <select
        id="FormControlSelect"
        v-model="lang"
        class="form-control"
      >
        <option
          v-for="(opt, index) in options"
          :key="index"
          :value="opt"
        >
          {{
            $t(`keyboardLang.${opt}`)
          }}
        </option>
      </select>
    </div>
  </form>
</template>

<script>
export default {
  name: 'DropdownOptionLang',
  props: {
    options: { type: Array, required: true }
  },
  data () {
    return {
      lang: ''
    }
  },
  watch: {
    lang () {
      const currentSelection = this.$store.getters.currentSelection
      const commitName = `${currentSelection.Type}/${currentSelection.product}`
      this.$store.commit(commitName, {
        type: 'inputType',
        val: this.lang
      })
    }
  },
  created () {
    this.lang = this.options[0]
  }
}
</script>
