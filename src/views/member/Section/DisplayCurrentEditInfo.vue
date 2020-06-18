<template>
  <div class="container-fluid">
    <div class="row customize-content">
      <div class="col-12 localnav-header">
        <!-- 返回鍵 -->
        <button
          class="color-gold text-nowrap pr-2"
          @click="$emit('close')"
        >
          <i class="fas fa-long-arrow-alt-left" />
        </button>
        <h2 class="d-inline-block">
          {{ info.type }}
        </h2>
      </div>
      <div class="col-12 info-area mb-5">
        <p>{{ description[info.type] }}</p>
        <div class="row info-area-item">
          <div class="col-8">
            <p>{{ val_ }}</p>
          </div>
          <div class="col-4 text-right">
            <button
              class="color-gold text-nowrap pr-2"
              @click="onShowModal(true)"
            >
              <i class="fas fa-pen" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <AppModal
      :show-modal="showModal"
      :show-logo="false"
      @close="onShowModal(false)"
    >
      <template #title>
        <h4>編輯個人資料</h4>
      </template>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          @submit.prevent="handleSubmit(onEdit)"
        >
          <div class="form-group">
            <component
              :is="currentInput"
              v-if="showModal"
              v-model="value"
            />
          </div>
          <div
            class="form-group"
            style="padding:0 10%"
          >
            <ButtonCancel
              text="取消"
              @click="onShowModal(false)"
            />
            <ButtonPrimary
              type="submit"
              text="確定"
            />
          </div>
        </form>
      </ValidationObserver>
    </AppModal>
  </div>
</template>

<script>
import AppModal from '@/components/base/Modal/AppModal'
import ButtonCancel from '@/components/base/Button/ButtonCancel'
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'
import InputName from '@/components/base/Input/InputName'
import InputEmail from '@/components/base/Input/InputEmail'
import InputAddress from '@/components/base/Input/InputAddress'

const description = {
  信箱: '請輸入可以收到信的Email。',
  生日: '生日必須與信用卡上名字相同。',
  姓名: '姓名必須與信用卡上名字相同。',
  電話: '電話號碼是登入帳號。',
  收件人地址: '請填入信用卡帳單地址。',
  身分證字號: '身分證前六碼。'
}

const componentInput = {
  信箱: 'InputEmail',
  姓名: 'InputName',
  收件人地址: 'InputAddress'
}

const apiKeys = {
  信箱: 'Email',
  生日: 'BirthDay',
  姓名: 'Name',
  收件人地址: ['City', 'Area', 'Address']
}

export default {
  name: 'DisplayCurrentEditInfo',
  components: {
    AppModal,
    ButtonCancel,
    ButtonPrimary,
    InputEmail,
    InputAddress,
    InputName
  },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      description,
      componentInput,
      showModal: false,
      value: ''
    }
  },
  computed: {
    currentInput () {
      return componentInput[this.info.type]
    },
    val_ () {
      if (this.info.type === '收件人地址') {
        const data = this.info.val
        return `${data.city}${data.area}${data.address}`
      }
      return this.info.val
    }
  },
  created () {
    this.value = this.info.val
  },
  methods: {
    onShowModal (event) {
      this.showModal = event
      if (!this.showModal) {
        this.value = this.info.val
      }
    },
    onEdit () {
      if (!this.value) return
      const data = {}
      if (this.info.type === '收件人地址') {
        for (const key of apiKeys[this.info.type]) {
          if (!this.value[key.toLowerCase()]) return
          data[key] = this.value[key.toLowerCase()]
        }
      } else {
        data[apiKeys[this.info.type]] = this.value
      }
      this.$store.dispatch('member/editUserInfo', data)
      this.onShowModal(false)
      this.$emit('close')
    }
  }
}
</script>
