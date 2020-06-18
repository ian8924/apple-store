<template>
  <!-- 內容 -->
  <main>
    <!-- 海外驗證 -->
    <div class="container-fluid justify-content-center">
      <div class="row customize-content">
        <div class="col-12 localnav-header">
          <h2 class="d-inline-block">
            海外消費驗證
          </h2>
          <p class="d-inline-block">
            請輸入信用卡完整卡號
          </p>
        </div>
        <div class="col-md-6 m-auto text-center">
          <iframe
            v-if="iframeSetting.token"
            ref="iframe"
            style="border:0px;"
            :src="`https://www.visammg.com/VCESIFrame/?Token=${iframeSetting.token}&;Lang=ch`"
            height="200"
            width="400"
            scrolling="no"
            @load="clickIframeHandler"
          />
        </div>
        <div class="col-12 action-group">
          <ButtonCancel
            text="重新驗證"
            @click="reVerify"
          />
          <ButtonPrimary
            text="下一步"
            @click="nextStepHandler"
          />
        </div>
      </div>
    </div>
    <AppModal
      :show-modal="showModal"
      :show-logo="false"
      @close="showModal = false"
    >
      <template
        v-if="status === 'Success'"
        #title
      >
        <i class="fas fa-check-circle color-primary display-4 mb-3" />
        <h3 class="modal-title mt-2 mb-3">
          驗證成功
        </h3>
        <p>如關閉網頁即放棄此活動資格，需重新進行海外消費驗證方可再次使用本優惠。</p>
      </template>
      <template
        v-else
        #title
      >
        <i class="fas fa-times-circle color-primary display-4 mb-3" />
        <h3
          id="Verify_Fail"
          class="modal-title mt-2 mb-3"
        >
          驗證失敗
        </h3>
        <p>此張VISA無限卡因過往六個月內未成功完成一筆海外交易，無法參加本活動。</p>
      </template>
      <!-- 驗證成功 -->
      <template
        v-if="status === 'Success'"
        #button
      >
        <ButtonCancel
          text="返回購物袋"
          @click="$router.push({name: 'shop bag'})"
        />
        <ButtonPrimary
          text="下一步"
          @click="$router.push({name: 'home'})"
        />
      </template>
      <!-- 驗證失敗 -->
      <template
        v-else
        #button
      >
        <ButtonCancel
          text="稍後驗證"
          @click="$router.push({name: 'home'})"
        />
        <ButtonPrimary
          text="重新驗證"
          @click="reVerify(); showModal = false;"
        />
      </template>
    </AppModal>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
import { project2bModule } from '@/stores/project2b.js'
import AppModal from '@/components/base/Modal/AppModal'
import ButtonCancel from '@/components/base/Button/ButtonCancel'
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'

const MODULE_NAME = 'project2b'

export default {
  name: 'VisaVerify',
  components: { AppModal, ButtonCancel, ButtonPrimary },
  data () {
    return {
      showModal: false,
      iframeSetting: {},
      status: ''
    }
  },
  mounted () {
    if (!this.$store.hasModule(MODULE_NAME)) {
      this.$store.registerModule(MODULE_NAME, project2bModule())
    }
    this.refreshVCESTokenHandler()
    // window.addEventListener('message', this.handleMessage)
    // this.$refs.iframe.onload = this.clickIframeHandler
  },
  beforeDestroy () {
    if (this.$store.hasModule(MODULE_NAME)) {
      this.$store.unregisterModule(MODULE_NAME)
    }
  },
  methods: {
    ...mapActions(MODULE_NAME, {
      validateVCESStatus: 'validateVCESStatus',
      getVCESToken: 'getVCESToken'
    }),
    async refreshVCESTokenHandler () {
      this.iframeSetting = await this.getVCESToken()
    },
    reVerify () {
      this.refreshVCESTokenHandler()
    },
    async nextStepHandler () {
      const { correlationId } = this.iframeSetting
      const { result } = await this.validateVCESStatus({ correlationId })
      this.status = result
      this.showModal = true
      if (result === 'Success') {
        sessionStorage.setItem('project', 'VISA')
      }
    },
    clickIframeHandler (event) {
    //   console.log('clickIframeHandler -> event', event)
    }
  }
}
</script>

<style>

</style>
