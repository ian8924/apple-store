<template>
  <div
    id="app"
  >
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'

}
</script>

<style>
.fade-enter-active {
  transition: opacity 0.8s;
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
