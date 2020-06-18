<template>
  <div class="form-group">
    <span class="d-block mb-2">收件人地址</span>
    <!-- 縣市 -->
    <div class="form-row">
      <div class="col-md-6 form-group form-row text-left mx-auto">
        <label
          class="col-md-4 col-4 my-auto"
          for="City"
        >縣市</label>
        <ValidationProvider
          v-slot="{ errors }"
          name="City"
          rules="required"
        >
          <select
            id="City"
            v-model="city"
            class="custom-select col-md-8 col-8"
            :class="{
              'is-invalid': errors[0]
            }"
            @change="changeCity"
          >
            <option
              :value="null"
              selected
            >
              請選擇縣市
            </option>
            <option
              v-for="(city, index) in listCity"
              :key="index"
              :value="city"
            >
              {{ city }}
            </option>
          </select>
        </ValidationProvider>
      </div>
      <!-- 鄉鎮市區 -->
      <div class="col-md-6 form-group form-row text-left mx-auto">
        <label
          class="col-md-4 col-4 my-auto"
          for="Area"
        >鄉鎮市區</label>
        <ValidationProvider
          v-slot="{ errors }"
          name="Area"
          rules="required"
        >
          <select
            id="Area"
            v-model="area"
            class="custom-select col-md-8 col-8"
            :class="{
              'is-invalid': errors[0]
            }"
          >
            <option
              :value="null"
              selected
            >
              請選擇鄉鎮市區
            </option>
            <option
              v-for="(area, index) in mapListArea"
              :key="index"
              :value="area"
            >
              {{ area }}
            </option>
          </select>
        </ValidationProvider>
      </div>
    </div>
    <!-- </div> -->
    <ValidationProvider
      v-slot="{ errors }"
      name="address"
      rules="required"
    >
      <input
        id="address"
        v-model="address"
        type="text"
        class="form-control col"
        placeholder="請輸入地址"
        :class="{ 'is-invalid': errors[0] }"
      >
      <div
        style="
          margin-top: .25rem;
          font-size: 80%;
          color: #dc3545;
        "
      >
        {{ errors[0] }}
      </div>
    </ValidationProvider>
  </div>
</template>

<script>
import { addrCity, addrDistrict } from '@/stores/config/config.address'
// 檢查縣市區域列表是否正確
// https://zh.wikipedia.org/wiki/中華民國自由地區鄉鎮市區列表
// for (const i in addrCity) {
//   console.log("TCL: addrDistrict", addrCity[i], addrDistrict[i].length);
// }

export default {
  name: 'InputAddress',
  props: {
    value: {
      default: () => {
        return { city: null, area: null, address: null }
      },
      type: Object
    }
  },
  data: () => {
    return {
      city: null,
      area: null,
      address: null,
      inputAddress: null,
      listCity: addrCity
    }
  },
  computed: {
    mapListArea () {
      const indexCity = this.listCity.indexOf(this.city)
      return addrDistrict[indexCity] || []
    }
  },
  watch: {
    value () {
      this.city = this.value.city || null
      this.area = this.value.area || null
      this.address = this.value.address || null
    },
    city () {
      this.computedInputAddress()
    },
    area () {
      this.computedInputAddress()
    },
    address () {
      this.computedInputAddress()
    }
  },
  mounted () {
    this.city = this.value.city || null
    this.area = this.value.area || null
    this.address = this.value.address || null
  },
  methods: {
    changeCity () {
      this.area = null
    },
    computedInputAddress () {
      this.inputAddress = {
        city: this.city,
        area: this.area,
        address: this.address
      }
      this.onEmit()
    },
    onEmit () {
      if (this.city !== null && this.area !== null && this.address !== null) {
        this.$emit('input', this.inputAddress)
      } else {
        this.$emit('input', null)
      }
    }
  }
}
</script>
