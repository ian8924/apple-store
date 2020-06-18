<template>
  <a
    class="list-area"
    @click.prevent="$emit('click')"
  >
    <div class="row align-items-center">
      <div class="col-md-3">
        <span class="circle-gold"><i class="fas fa-shopping-cart" /></span>
        {{ date }}
      </div>
      <div class="col-md-6">{{ orderID }}</div>
      <div class="col-md-2 "><span class="rectangle-gold small">查詢訂單</span></div>
      <!-- <div class="col-md-1">
        <span
          class="small d-none"
          :class="[stateClass[item.step]]"
        >{{
          stateName[item.step]
        }}</span>
      </div> -->
      <div class="col-md-1 text-right">
        <span class="arrow arrow-right" />
      </div>
    </div>
  </a>
</template>

<script>
import moment from 'moment'
import { stateClass, stateName } from '@/stores/config/config.orederstate'

export default {
  name: 'ListItemOrderState',
  props: {
    item: { type: Object, required: true }
    /*
    {
        summary: String,
        state: String,
        date: String
    }
    */
  },
  data () {
    return {
      stateClass,
      stateName
    }
  },
  computed: {
    date () {
      return moment(this.item.date.split('T')[0]).format('YYYY-MM-DD')
    },
    /*  summary () {
      const detail = this.item.prodDetail.prodDetail
      let summary = detail.title || detail.name
      summary =
        summary + (detail.bandSizeInfo ? `，${detail.bandSizeInfo}` : '')
      return summary
    }, */
    orderID () {
      return this.item.orderID
    }
  }
}
</script>
