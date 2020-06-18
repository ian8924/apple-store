<template>
  <AppModal
    :show-modal="showModal"
    :show-logo="false"
    @close="$emit('close')"
  >
    <template>
      <div class="text-center">
        <i class="fas fa-check-circle color-primary display-4 mb-3" />
        <h5
          class="modal-title mt-2 mb-3"
        >
          本活動期間<br>限定使用Visa信用卡
        </h5>
        <p>
          「Apple Rewards Store最高折抵1,000元」活動，需做資格認證，請立即驗證取得優惠資格。詳見 <a
            href="#"
            @click="toVisaTC"
          >活動網站公告</a> 。
        </p>
      </div>
    </template>
    <template #button>
      <ButtonPrimary
        text="立即取得優惠"
        @click="toVisaTC"
      />
    </template>
  </AppModal>
</template>

<script>
import AppModal from '@/components/base/Modal/AppModal'
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'

export default {
  name: 'ModalVisaTC',
  components: {
    AppModal,
    ButtonPrimary
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toVisaTC () {
      this.$router.push({ name: 'visa tc' })
    }
  }
}
</script>

<style>

</style>
