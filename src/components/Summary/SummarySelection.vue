<template>
  <transition name="fade">
    <div class="selection-summary">
      <div class="selection-p-icon">
        <img
          src="@/assets/images/iPhone/iphone-summary.png"
          alt=""
        >
      </div>
      <div class="selection-p-detail">
        <h4>摘要</h4>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SummarySelection'
}
</script>
