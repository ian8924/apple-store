<template>
  <div class="d-flex justify-content-center align-items-center">
    <div
      class="spinner-border color-primary m-5 spinner-size"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner'
}
</script>

<style>
.define-size {
  min-height: 400px;
}
.spinner-size {
  width: 5rem;
  height: 5rem;
}
</style>
