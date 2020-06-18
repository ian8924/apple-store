<template>
  <header class="container-fluid header-container">
    <div class="row top-bar">
      <div
        class="logo col-6"
      >
        <a href="/">
          <img
            class="img-fluid d-inline"
            src="../../assets/Logo.svg"
            alt="Apple Rewards Store"
          >
        </a>
      </div>
      <AppUserMenu class="col-6" />
    </div>
  </header>
</template>

<script>
import AppUserMenu from './AppUserMenu'
export default {
  name: 'AppHeader',
  components: { AppUserMenu }
}
</script>
