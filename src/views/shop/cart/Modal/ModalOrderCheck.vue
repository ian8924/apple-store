<template>
  <AppModal
    :show-modal="showModal"
    :show-logo="false"
    @close="$emit('close')"
  >
    <ol>
      <li class="pt-2">
        下單前請務必確認商品規格尺寸是否正確，除商品故障、誤寄與商品瑕疵外，恕無法受理個人因素退貨。
      </li>
      <li class="pt-2">
        若要取消訂單請於翌日中午12點前完成
      </li>
      <li class="color-red pt-2">
        因受新型冠狀肺炎疫情影響，Apple相關產品到貨時間均不確定。 請您購買前先行評估，若可等待較長的到貨時間，再完成下單。
      </li>
    </ol>
    <p class="text-center">
      造成您的不便，我們深感抱歉，感謝您的支持與體諒！
    </p>
    <template #button>
      <ButtonCancel
        text="取消"
        @click="$emit('close')"
      />
      <ButtonPrimary
        text="確定"
        @click="$emit('goSwipeCard')"
      />
    </template>
  </AppModal>
</template>

<script>
import AppModal from '@/components/base/Modal/AppModal'
import ButtonCancel from '@/components/base/Button/ButtonCancel'
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'
export default {
  name: 'ModalOrderCheck',
  components: {
    AppModal,
    ButtonCancel,
    ButtonPrimary
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  }
}
</script>
