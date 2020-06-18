<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 p-0 mb-5">
        <div class="banner-503-fail" />
        <div class="card-info-content">
          <i class="fas fa-times-circle color-primary display-4 mb-3" />
          <h2>伺服器連線失敗</h2>
          <h5 class="mb-4">
            無法使用，請確認網路連線狀態
          </h5>
          <button
            type="button"
            class="btn-outline-red mb-3"
            data-toggle="modal"
            data-target="#Addcard"
            @click="$emit('click')"
          >
            重新嘗試
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisplayServerError'
}
</script>
