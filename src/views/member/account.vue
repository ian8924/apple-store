
<template>
  <main>
    <div class="row customize-content">
      <div class="col-12 localnav-header separation-line">
        <p class="h2">
          加入會員
        </p>
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSingUp)">
          <div class="container col-md-6 login-group">
            <div class="form-group">
              <InputName
                v-model="username"
                autocomplete="off"
              />
            </div>
            <div class="form-group">
              <InputPassword
                v-model="pwd"
                label="請輸入密碼"
              />
            </div>

            <div class="form-group">
              <InputPasswordRepeat
                label="確認密碼"
              />
            </div>
            <div class="form-group">
              <InputEmail
                v-model="email"
              />
            </div>
            <InputAddress
              v-model="address"
            />
          </div>
          <div class="col-12 separation-line" />
          <div
            class="container col-md-5 login-group d-flex justify-content-around  align-items-center text-center"
          >
            <div
              v-if="!isLogging"
              class="col-6"
            >
              <ButtonCancel
                text="取消"
                @click="onCancel"
              />
            </div>
            <div
              v-if="!isLogging"
              class="col-6"
            >
              <ButtonPrimary
                text="確認"
                type="submit"
              />
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </main>
</template>

<script>
import ButtonCancel from '@/components/base/Button/ButtonCancel'
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'
import InputName from '@/components/base/Input/InputName'
import InputPassword from '@/components/base/Input/InputPassword'
import InputEmail from '@/components/base/Input/InputEmail'
import InputPasswordRepeat from '@/components/base/Input/InputPasswordRepeat'
import InputAddress from '@/components/base/Input/InputAddress'

export default {
  name: 'Login',
  components: {
    ButtonCancel,
    ButtonPrimary,
    InputPassword,
    InputEmail,
    InputPasswordRepeat,
    InputAddress,
    InputName
  },
  data: () => {
    return {
      account: null,
      pwd: null,
      email: null,
      birth: null,
      ID: null,
      address: {},
      username: null
    }
  },
  computed: {
    isLoginFail () {
      return false
    },
    isLogging () {
      return false
    },
    // 定義 API 需要的資料格式
    postInfo () {
      return {
        Mobile: this.account,
        Password: this.pwd,
        Name: this.username,
        Email: this.email,
        BirthDay: this.birth,
        ID: this.ID,
        City: this.address.city,
        Area: this.address.area,
        Address: this.address.address,
        customerType: 'Canlead'
      }
    }
  },
  destroyed () {
    this.$store.commit('member/setRegistryAccount', '')
  },
  created () {
    // 判斷是否已驗證過手機，否則跳轉至驗證頁面
    const account = this.$store.getters['member/curRegistryAccount']
    if (account || false) {
      this.account = account
    } else {
      this.$router.push({
        name: 'verify',
        params: { lang: process.env.VUE_APP_I18N_LOCALE }
      })
    }
  },
  methods: {
    // 呼叫 API 進行帳號註冊
    onSingUp () {
      this.$store.dispatch('member/signup', { postInfo: this.postInfo })
    },
    onCancel () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style>
.customize-content .login-group {
  margin-top: 1em;
  margin-bottom: 1em;
}
.address-input-small {
  width: 16% !important;
  margin-bottom: 1rem;
}
.customize-content .login-group {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
