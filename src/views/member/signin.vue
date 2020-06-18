<template>
  <main>
    <div class="row customize-content">
      <!-- 註冊成功提示 -->
      <div
        v-if="isRegistry"
        class="alert alert-message"
        role="alert"
      >
        <p class="h5 alert-heading">
          <i class="fas fa-check-circle mr-2" />註冊成功！請登入會員
        </p>
      </div>
      <!-- 頁面標題 -->
      <div class="col-12 localnav-header separation-line">
        <p class="h2">
          會員登入
        </p>
      </div>
      <div class="container col-lg-6 login-group">
        <!-- Login Form -->
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(executeRecaptcha)">
            <div
              v-if="isLoginFail"
              class="alert alert-danger"
              role="alert"
            >
              <p class="h5 alert-heading mb-0">
                <i class="fas fa-exclamation-circle mr-2" />登入失敗，帳號或密碼錯誤
              </p>
            </div>
            <!-- 手機號碼 -->
            <div class="form-group">
              <InputMobile
                v-model="account"
                :disabled="loggingIn"
                label="帳號 手機號碼"
              />
            </div>
            <!-- 密碼-->
            <div class="form-group">
              <InputPassword
                v-model="pwd"
                :disabled="loggingIn"
                label="密碼"
              />
            </div>
            <captcha
              ref="captcha"
              @verify="verify"
              @error="errorRecaptcha"
            />
            <div
              class="row form-group d-flex align-items-center align-self-center"
            >
              <!-- 忘記密碼 -->
              <div class="col-6">
                <button
                  type="button"
                  class="color-gold small"
                  @click="clickForgetPassword"
                >
                  忘記密碼？
                </button>
              </div>
              <!-- 登入按鈕 -->
              <div class="col-6 text-right">
                <div class="d-flex justify-content-end align-self-center">
                  <div
                    v-show="loggingIn"
                    class="spinner-border color-primary mr-3 my-auto signin-spinner-size"
                    role="status"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                  <ButtonPrimary
                    :disabled="loggingIn"
                    type="submit"
                    text="登入"
                    @error="errorRecaptcha"
                  />
                </div>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <!-- 分隔線 -->
      <div class="col-12 separation-line" />
      <!-- 註冊會員 -->
      <div
        class="container col-md-5 d-flex login-group justify-content-around align-items-center"
      >
        <div class="col-4">
          <div class="font-weight-light text-right">
            沒有帳號？
          </div>
        </div>
        <div class="col-8">
          <button
            type="button"
            class="color-gold small"
            @click="clickJoinMember"
          >
            立即加入Apple Rewards Store會員
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// import VueRecaptcha from "vue-recaptcha";
import captcha from '@/components/captcha'
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'
import InputMobile from '@/components/base/Input/InputMobile'
import InputPassword from '@/components/base/Input/InputPassword'
// import service from "../../stores/api/userservice";

export default {
  name: 'Login',
  components: { ButtonPrimary, InputMobile, InputPassword, captcha },
  data: () => {
    return {
      submitted: false,
      account: null,
      pwd: null,
      isRegistry: false,
      recaptcha: process.env.VUE_APP_RECAPTCHA_KEY
    }
  },
  computed: {
    isLoginFail () {
      return this.$store.getters['member/isLogFailed']
    },
    loggingIn () {
      return this.$store.getters['member/isLogging']
    }
  },
  destroyed () {
    this.$store.commit('member/resetLogFailed')
  },
  methods: {
    executeRecaptcha () {
      this.$store.commit('member/loginRequest', { account: this.account })
      // this.$refs.invisibleRecaptcha.execute();
      this.$refs.captcha.execute()
    },
    errorRecaptcha () {
      this.$store.commit('member/loginFailure')
      // this.$refs.invisibleRecaptcha.reset();
      this.$refs.captcha.reset()
    },
    async verify (isVeryfied) {
      // 我不是機器人驗證
      const hostname = window.location.hostname
      // const isVeryfied = await service.verifyRECAPTCHA(token);
      if (hostname !== 'localhost' && !isVeryfied) {
        // this.$refs.invisibleRecaptcha.reset();
        this.$refs.captcha.reset()
        this.$store.commit('member/loginFailure')
        return
      }
      this.clickLogin()
    },
    async clickLogin () {
      this.submitted = true
      const { account, pwd } = this
      var jumpRoute = 'home'
      if (this.$store.getters['cart/listProductinCart'].length !== 0) {
        jumpRoute = 'shop bag'
      }
      await this.$store.dispatch('member/signin', { account, pwd, jumpRoute })
      if (this.isLoginFail) {
        // this.$refs.invisibleRecaptcha.reset()
        this.$refs.captcha.reset()
      }
    },
    clickJoinMember () {
      this.$router.push({ name: 'tnc' })
    },
    clickForgetPassword () {
      this.$router.push({ name: 'forget password' })
    }
  },
  beforeRouteEnter (to, from, next) {
    // 如果是來自會員註冊，顯示註冊成功
    if (from.name === 'registry' && to.query.isRegistry) {
      next(vm => {
        vm.isRegistry = true
      })
    }
    next(
      vm => {
        if (vm.$store.getters['member/isLoggedIn']) {
          vm.$router.push({ name: 'home' })
        }
      }
    )
  },
  beforeRouteLeave (to, from, next) {
    if (!this.loggingIn) {
      next()
    }
  }
}
</script>
<style >
.customize-content .login-group {
  margin-top: 1em;
  margin-bottom: 1em;
}

.login-spinner {
  margin: 0 auto;
}
@media screen and (max-width: 320px) {
  .signin-spinner-size {
    width: 1rem;
    height: 1rem;
  }
}
</style>
