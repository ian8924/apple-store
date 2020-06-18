<template>
  <div
    v-if="!isLogined"
    class="nav justify-content-end pr-0"
  >
    <a
      class="pr-2 color-white pt-4"
      href="#"
      @click="$router.push({name:'faq'})"
    >購買須知</a>
    <button
      type="button"
      class="btn btn-login"
      @click="handleClick('signin')"
    >
      <i class="fas fa-sign-in-alt pr-2" />{{ $t("signin") }}
    </button>
  </div>
  <div
    v-else
    class="nav justify-content-end"
  >
    <div class="align-self-center">
      <a
        id="dropdownMenuButton"
        class="login-info"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img
          src="../../assets/images/icon_login.png"
          alt=""
        >
      </a>
      <div
        class="dropdown-menu dropdown-menu-right login-info-list"
        aria-labelledby="dropdownMenuButton"
      >
        <p class="h6 dropdown-header">
          {{ userName }} 登入
        </p>
        <a
          class="dropdown-item"
          @click.prevent="handleClick('edit account')"
        ><i class="fas fa-cog mr-2" />帳戶管理</a>
        <a
          class="dropdown-item"
          href="#"
          @click.prevent="handleClick('order')"
        ><i class="fas fa-list-alt mr-2" />訂單管理</a>
        <a
          class="dropdown-item"
          href="#"
          @click.prevent="handleClick('faq')"
        ><i class="fas fa-question-circle mr-2" />常見問題</a>
        <a
          class="dropdown-item"
          @click.prevent="handleSignout()"
        ><i class="fas fa-sign-out-alt mr-2" />登出</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AppUserMenu',
  computed: {
    isLogined () {
      return this.$store.getters['member/isLoggedIn']
    },
    userName () {
      const info = this.$store.getters['member/user']
      if (!(info || false)) return ''
      return info.Name
    }
  },
  watch: {
    isLogined: {
      immediate: true,
      handler (isLoggedIn) {
        if (!this.isLogined) return
        this.$store.dispatch('member/getBindMagicCard')
        this.$store.dispatch('member/getUserInfo')
      }
    }
  },
  methods: {
    handleClick (event) {
      this.$route.params.from = this.$route.name
      this.$router.push({ name: event, params: this.$route.params })
    },
    handleSignout () {
      this.$store.dispatch('member/signout')
    }
  }
}
</script>
