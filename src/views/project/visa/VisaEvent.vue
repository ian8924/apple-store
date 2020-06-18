<template>
  <main>
    <!-- 注意事項 -->
    <div class="container-fluid ">
      <div class="row">
        <div
          id="carouselIndicators"
          class="carousel slide"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselIndicators"
              data-slide-to="0"
              class="active"
            />
            <li
              data-target="#carouselIndicators"
              data-slide-to="1"
            />
            <li
              data-target="#carouselIndicators"
              data-slide-to="2"
            />
            <li
              data-target="#carouselIndicators"
              data-slide-to="3"
            />
            <li
              data-target="#carouselIndicators"
              data-slide-to="4"
            />
            <li
              data-target="#carouselIndicators"
              data-slide-to="5"
            />
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <a>
                <img
                  src="../../../assets/images/Banner/banner_04.jpg"
                  class="d-block w-100"
                  alt="..."
                >
                <div class="carousel-caption d-md-block">
                  <h3 class="color-white">Visa 海外消費</h3>
                  <p class="color-white mb-1">Apple Rewards Store 最高折抵 1,000元</p>
                </div>
              </a>
            </div>
            <div class="carousel-item">
              <a>
                <img
                  src="../../../assets/images/Banner/banner_02.jpg"
                  class="d-block w-100"
                  alt="..."
                >
                <div class="carousel-caption d-md-block">
                  <h3>MacBook Pro</h3>
                  <p class="mb-1">最強大， 速配最強者。</p>
                </div>
              </a>
            </div>
            <div class="carousel-item">
              <a>
                <img
                  src="../../../assets/images/Banner/banner_06.jpg"
                  class="d-block w-100"
                  alt="..."
                >
                <div class="carousel-caption d-md-block">
                  <h3>最受歡迎 iPad</h3>
                  <p class="mb-1">像電腦，不像任何電腦。</p>
                </div>
              </a>
            </div>
            <div class="carousel-item">
              <a>
                <img
                  src="../../../assets/images/Banner/banner_01.jpg"
                  class="d-block w-100"
                  alt="..."
                >
                <div class="carousel-caption d-md-block">
                  <h3>客製化雷射雕刻</h3>
                  <p class="mb-1">Apple 獨家提供。</p>
                </div>
              </a>
            </div>
            <div class="carousel-item">
              <a>
                <img
                  src="../../../assets/images/Banner/banner_05.jpg"
                  class="d-block w-100"
                  alt="..."
                >
                <div class="carousel-caption d-md-block">
                  <h3 class="">全商品支援紅利兌換</h3>
                  <p class="mb-1">輕鬆兌換精選商品，盡情享受美好生活。</p>
                </div>
              </a>
            </div>
            <div class="carousel-item">
              <a>
                <img
                  src="../../../assets/images/Banner/banner_03.jpg"
                  class="d-block w-100"
                  alt="..."
                >
                <div class="carousel-caption d-md-block">
                  <h3>保證原廠出貨與原廠保固</h3>
                  <p class="mb-1">Apple 品質保證。</p>
                </div>
              </a>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              class="carousel-control-prev-icon"
              aria-hidden="true"
            />
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselIndicators"
            role="button"
            data-slide="next"
          >
            <span
              class="carousel-control-next-icon"
              aria-hidden="true"
            />
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div class="row">
        <div class="col-12 p-0 mb-5">
          <div class="banner-visa" />
          <div class="card-info-content visa-verify ">
            <h5 class="mb-4">
              Visa 活動注意事項
            </h5>
            <div class="text-left">
              <h6 class="strong">
                活動日期
              </h6>
              <p>即日起~2020/06/30</p>
              <h6 class="strong">
                優惠內容
              </h6>
              <p>Apple Rewards Store 抵用券最高折抵1,000元</p>
              <h6 class="strong">
                優惠對象
              </h6>
              <p>持Visa無限卡、商務御璽卡、御璽卡於消費前6個月內至少新增一筆海外交易（不限金額），即可在Apple Rewards Store 平台享有下列滿額回饋</p>
              <h6 class="strong">
                注意事項
              </h6>
              <ol>
                <li>
                  折抵金額依購物袋總金額而定，請參見下表。系統將於結帳時自動帶入。
                  <table class="table table-bordered mt-3">
                    <thead>
                      <tr>
                        <th scope="col">
                          總金額
                        </th>
                        <th scope="col">
                          折抵
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          3,000~10,000元
                        </th>
                        <td>400元</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          10,001~20,000元
                        </th>
                        <td>500元</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          20,001~30,000元
                        </th>
                        <td>600元</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          30,001~40,000元
                        </th>
                        <td>800元</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          40,001元以上
                        </th>
                        <td>1,000元</td>
                      </tr>
                    </tbody>
                  </table>
                </li>
                <li>活動期間總組數限量5,000組，兌換完畢後恕不提供優惠。</li>
                <li>限制為每卡(卡號)限一次資格使用，結帳須以Visa無限卡、商務御璽卡、御璽卡結帳。</li>
                <li>本優惠不可轉讓，僅對所示優惠有效，不可兌換現金，不得與其他優惠合併使用。</li>
                <li>
                  持卡人之Visa信用卡如有下列情形者，將喪失本活動優惠之權利:
                  列為壞帳準備、強制停用、偽冒停用、申請停用、帳戶餘額不足、未開啟卡片刷卡功能、或卡片刷卡功能效期已過。
                </li>
                <li>Apple Rewards Store網站之優惠及服務係由肯驛國際所提供，客戶對所提供之優惠及服務有任何爭議，或所有交易相關事項，由肯驛國際及合作商店負責處理。</li>
                <li>「肯驛國際」保留隨時修改、變更或終止本活動之權利，無須事先通知。活動內容若有調整，請依專屬活動網站公告為準。</li>
                <li>
                  為免疑義，特此聲明：本活動所述優惠為Visa卡持卡人所享有，優惠相關之所有商品及／或服務，則由「肯驛國際」提供。據此，持卡人瞭解、承認並同意：持卡人若依據優惠購買任何商品及／或服務，即構成持卡人與「肯驛國際」之間的合約，與Visa或Visa發卡機構（銀行）一概無涉。持卡人若使用或有意使用上述優惠的任何商品及／或服務，即表示持卡人瞭解、承認並同意下列事項：
                </li>
                <li>
                  持卡人依據上述優惠購買或有意購買的任何商品及／或服務，若有任何相關的索賠、申訴或爭議情事（統稱「要求」），須由持卡人直接洽詢「肯驛國際」俾利解決，不得向Visa或Visa發卡機構（銀行）提出任何要求。
                </li>
                <li>
                  在不違反上述原則的情況下，針對優惠提供的商品及／或服務，如有使用或意圖使用商品及／或服務的行為造成或衍生任何人體傷害、死亡、不實陳述、傷害或疏失，概不由Visa針對任何相關的（直接、間接或其他）損失、傷害、支出或要求向任何人負責。
                </li>
                <li>Apple並未參與此活動，亦非此活動贊助商。</li>
              </ol>
            </div>
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
                ><span class="checkbox-checkmark" /></label>
            </div>
            <div class="action-group mt-5">
              <ButtonCancel
                text="回首頁"
                @click="$router.push({name: 'home'})"
              />
              <ButtonPrimary
                text="立即兌換"
                @click="nextStepHanlder"
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
  name: 'VISAEvent',
  components: { ButtonPrimary, ButtonCancel },
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
    nextStepHanlder () {
      if (this.isChecked) {
        this.$router.push({ name: 'visa verify' })
      } else {
        this.animate = true
        setTimeout(() => {
          this.animate = false
        }, 1000)
      }
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
