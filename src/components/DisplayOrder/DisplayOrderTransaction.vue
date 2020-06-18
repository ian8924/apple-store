<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 p-0 mb-5">
        <div class="banner-header" />
        <div class="card-info-content">
          <i class="fas fa-check-circle color-primary display-4 mb-3" />
          <h2>訂單完成</h2>
          <h5 class="mb-4">
            您的訂單編號：{{ orderSerial }}
          </h5>
          <p>您可以透過訂單完成頁或 email 通知之「訂單編號」 進行訂單資料查詢。</p>
          <p>若您確認填寫聯絡資料正確，但仍未收到 email，請洽客服協助處理。</p>
          <div class="action-group mt-5">
            <ButtonCancel
              text="管理訂單"
              @click="goManagement"
            />
            <ButtonPrimary
              text="回首頁"
              @click="goHome"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCancel from '@/components/base/Button/ButtonCancel'
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'
export default {
  name: 'DisplayOrderTransaction',
  components: {
    ButtonCancel, ButtonPrimary
  },
  props: {
    showTransaction: {
      type: Boolean,
      default: false
    },
    orderSerial: {
      type: String,
      required: true
    }
  },
  methods: {
    goHome () {
      this.$router.push({ name: 'home' })
    },
    goManagement () {
      this.$router.push({ name: 'order' })
    }
  }
}
</script>
