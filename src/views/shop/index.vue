<template>
  <keep-alive :include="['Cart','OrderPayment']">
    <router-view />
  </keep-alive>
</template>

<script>
export default {
  name: 'Shop'
}
</script>

<style>
</style>
