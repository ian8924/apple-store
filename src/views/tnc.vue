<template>
  <main>
    <div class="container-fluid">
      <div class="row customize-content">
        <div class="col-12 localnav-header">
          <h2>隱私權聲明</h2>
        </div>
        <div class="col-12 account-content">
          <div class="row justify-content-lg-center m-0">
            <div class="col-lg-10">
              <p>
                為維護個人隱私權，肯驛國際股份有限公司謹以下聲明，向您說明本網站蒐集個人資料之目的、類別、利用範圍及方式，以及您所得行使之權利等事項；如果您對肯驛國際股份有限公司的隱私聲明、以下相關告知事項、或與個人資料保護有關之相關事項有任何疑問，可以和肯驛國際股份有限公司客服中心聯絡，客服人員將儘快回覆說明。
              </p>
              <h5>一、蒐集公司名稱：肯驛國際股份有限公司</h5>
              <h5>二、蒐集之特定目的：消費者、客戶管理與服務</h5>
              <h5>三、個人資料之類別</h5>
              <p>本公司蒐集您的個人資料類別為個人資料保護法之特定目的及個人資料之類別所稱：</p>
              <ol>
                <li>辨識個人者</li>
                <li>辨識財務者</li>
              </ol>
              <h5>四、個人資料利用期間、地區、對象、方式</h5>
              <p>
                您的個人資料僅於中華民國領域內利用，且利用(揭露)對象僅為肯驛國際(股)公司提供服務之廠商及人員及發卡銀行。
                本公司僅於前述特定目的範圍內秉持合理、誠實及信用之方法處理、利用您的個人資料，利用期間為專案合作期間，並僅保存至本公司與本專案合作期間結束。
              </p>
              <h5>五、當事人享有之權利</h5>
              <p>您得以書面方式請求下列事項：</p>
              <ol>
                <li>查詢或請求閱覽我們所保存您的個人資料</li>
                <li>製給複製本您提供的個人資料</li>
                <li>補充或更正您提供的個人資料</li>
                <li>停止蒐集、處理或利用您的個人資料</li>
                <li>專案合作結束後刪除您的個人資料</li>
              </ol>
              <p>但有下列情形之一者，本公司依法可拒絕您的要求：</p>
              <ol>
                <li>妨害國家安全、外交及軍事機密、整體經濟利益或其他國家重大利益。</li>
                <li>妨害公務機關執行法定職務</li>
                <li>妨害蒐集機關或第三人之重大利益</li>
              </ol>

              <div class="mb-5 mt-5">
                <label
                  class="checkbox-container"
                  :class="{ shake: animate }"
                >本人已詳細閱讀並瞭解上述隱私權宣告
                  ，也清楚瞭解貴公司蒐集、處理或利用本人個人資料之目的及用途。本人在此同意貴公司得蒐集、處理及利用屬於本人之前述個人資料。且同意以上價格、訂購內容、注意事項及會員條款，並盡到上述內容所提之權利及義務。
                  <input
                    v-model="isChecked"
                    type="checkbox"
                    checked="checked"
                    class="shake"
                  >
                  <span class="checkbox-checkmark" />
                </label>
              </div>
            </div>
            <div class="col-12 action-group">
              <ButtonCancel
                text="回上頁"
                @click="previousPage"
              />
              <ButtonPrimary
                text="下一步"
                @click="nextStep"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ButtonCancel from '@/components/base/Button/ButtonCancel'
import ButtonPrimary from '@/components/base/Button/ButtonPrimary'
export default {
  name: 'TermsCondition',
  components: { ButtonCancel, ButtonPrimary },
  data () {
    return {
      isChecked: false,
      animate: false
    }
  },
  beforeDestroy () {
    clearTimeout()
  },
  methods: {
    nextStep () {
      if (this.isChecked) {
        this.$router.push({ name: 'verify' })
      } else {
        this.animate = true
        setTimeout(() => {
          this.animate = false
        }, 1000)
      }
    },
    previousPage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.shake {
  -webkit-animation: shake 0.2s linear 0s 4;
  animation: shake 0.2s linear 0s 3;
}

@-webkit-keyframes shake {
  0% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
}
@keyframes shake {
  0% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
}
</style>
