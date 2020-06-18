<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row footer-content">
        <div class="col-md-10 offset-lg-1 ">
          <div class="row interest-rate">
            <div class="col-md-4 text-center">
              <h5>謹慎理財 信用至上</h5>
            </div>
            <div class="col-md-8">
              <ul>
                <li>信用卡循環年利率以各發卡銀行公告為主。</li>
                <li>每筆預借現金手續費及其他費用，詳情依各發卡銀行網站公告為準。</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-10 offset-lg-1">
          <p class="my-xl-1 ">
            Copyright&copy; 2020 CanLead International All Rights Reserved.<br>
            本網站之優惠及服務係由肯驛國際所提供，客戶對所提供之優惠及服務有任何爭議，或所有交易相關事項，由肯驛國際及合作商店負責處理。
          </p>
          <div class="footer-link">
            <ul>
              <li
                v-for="(TC, index) in listTC"
                :key="index"
              >
                <a
                  href="#"
                  @click.prevent="goTnC(TC)"
                >
                  {{ $t(`copywriting.footer.${TC}`) }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="col-md-1 totop"
          @click.prevent="backTop"
        >
          <a
            id="BackTop"
            href
          >
            To Top
            <i class="fas fa-angle-up" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { listTC } from '../../stores/config/config.tc'

export default {
  name: 'AppFooter',
  data () {
    return {
      listTC
    }
  },
  methods: {
    backTop () {
      // https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    },
    goTnC (event) {
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
      this.$router.push({ name: 'tnc all', query: { show: event } })
    }
  }
}
</script>
