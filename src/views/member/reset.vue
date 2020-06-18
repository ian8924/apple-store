<template>
  <!-- 內容 -->
  <main>
    <div class="container-fluid">
      <div class="row customize-content">
        <div class="col-12 localnav-header">
          <h2>變更密碼</h2>
        </div>
        <div class="col-12 account-content">
          <div class="row justify-content-lg-center m-0">
            <div class="col-lg-6">
              <div class="text-center mt-5">
                <i class="fas fa-check-circle color-primary display-4 mb-3" />
                <h2>密碼已變更</h2>
                <p>請重新登入，以檢視您的資訊。</p>
                <ButtonPrimary
                  text="重新登入"
                  @click="reLogin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'
export default {
  name: 'Reset',
  components: { ButtonPrimary },
  created () {
    if (!this.$store.getters['member/isResetPwd']) {
      this.$router.push({ name: 'home' })
    }
  },
  methods: {
    reLogin () {
      this.$store.state.member.isResetPwd = false
      this.$router.push({ name: 'signin' })
    }
  }
}
</script>
