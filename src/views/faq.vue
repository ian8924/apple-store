<template>
  <main>
    <!-- 手風琴 -->
    <div class="container-fluid ">
      <div class="row">
        <div class="customize-content">
          <div class="col-12 page-title">
            <h3>常見問題</h3>
          </div>
          <div
            id="accordion"
            class="accordion"
          >
            <!-- Q start -->
            <div class="card">
              <div
                id="headingUs"
                class="card-header"
              >
                <h2 class="mb-0">
                  <button
                    class="btn w-100"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseUs"
                    aria-expanded="true"
                    aria-controls="collapseUs"
                  >
                    <span class="accordion-title">聯絡我們</span>
                    <span class="icon-plus" />
                  </button>
                </h2>
              </div>
              <div
                id="collapseUs"
                class="collapse show"
                aria-labelledby="headingUs"
                data-parent="#accordion"
              >
                <div class="card-body answer-content">
                  <p>客服專線: 04-2206-2709</p>
                  <p>服務時間: 09:00至21:00</p>
                </div>
              </div>
            </div>
            <!-- Q end -->
            <!-- Q start -->
            <div class="card">
              <div
                id="headingOne"
                class="card-header"
              >
                <h2 class="mb-0">
                  <button
                    class="btn w-100 collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    <span class="accordion-title">購買相關</span>
                    <span class="icon-plus" />
                  </button>
                </h2>
              </div>
              <div
                id="collapseOne"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div class="card-body answer-content">
                  <h5 class=" border-bottom">
                    本平台購買方式為何?
                  </h5>
                  <div class="answer-item">
                    <p>提供信用卡線上付款。</p>
                  </div>
                  <h5 class=" border-bottom">
                    是否可以一筆訂單同時購買多項商品?
                  </h5>
                  <div class="answer-item">
                    <p>將商品加入購物袋即可單筆訂單同時結帳。</p>
                  </div>
                  <h5 class=" border-bottom">
                    如何編輯修改個人基本資料?
                  </h5>
                  <div class="answer-item">
                    <p>點擊右上方人像，「帳戶管理」，個人資料除「電話」無法修改，其餘皆可修改。</p>
                  </div>
                  <h5 class=" border-bottom">
                    如何變更訂單資訊?
                  </h5>
                  <div class="answer-item">
                    <p>如需變更您訂單的相關資訊請於訂購日隔天中午 12 點前聯繫肯驛國際客服 04-2206-3036，若逾時恕將無法協助變更。</p>
                  </div>
                  <h5 class="border-bottom">
                    7天鑑賞期退貨規範？
                  </h5>
                  <div class="answer-item">
                    <p>
                      依據消費者保護法之規定，消費者得於收到商品或接受服務後七天內，以退回商品或書面通知方式解除契約，無須說明理由及負擔任何費用或對價，但免費兌換贈品則無法適用7天鑑賞期退貨。且以下情形例外不適用：
                    </p>
                    <ol>
                      <li>易於腐敗、保存期限較短或解約時即將逾期。</li>
                      <li>依消費者要求所為之客製化給付。</li>
                      <li>報紙、期刊或雜誌。</li>
                      <li>經消費者拆封之影音商品或電腦軟體。</li>
                      <li>非以有形媒介提供之數位內容或一經提供即為完成之線上服務，經消費者事先同意始提供。</li>
                      <li>已拆封之個人衛生用品。</li>
                      <li>國際航空客運服務。</li>
                    </ol>
                    <p>
                      故若販售的商品為以上不適用於7天鑑賞期之商品，七天鑑賞期指的是猶豫期而非試用期喔！商品須在完整無拆封且可還原狀態下才能進行退貨。因此，若退貨商品有逾越檢查必要之使用痕跡或需酌收費用才可還原的情形時，買方需支付商品整新費用等必要費用。
                    </p>
                    <p>註：七天鑑賞期的算法是從收到商品的隔天開始算七天，且包含例假日。</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Q end -->
            <!-- Q start -->
            <div class="card">
              <div
                id="headingTow"
                class="card-header"
              >
                <h2 class="mb-0">
                  <button
                    class="btn w-100 collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTow"
                    aria-expanded="false"
                    aria-controls="collapseTow"
                  >
                    <span class="accordion-title">商品相關</span>
                    <span class="icon-plus" />
                  </button>
                </h2>
              </div>
              <div
                id="collapseTow"
                class="collapse"
                aria-labelledby="headingTow"
                data-parent="#accordion"
              >
                <div class="card-body answer-content">
                  <h5 class=" border-bottom">
                    哪些商品有提供客製化鐫刻服務?
                  </h5>
                  <div class="answer-item">
                    <p>目前有提供此服務產品為 AirPods、iPad、iPod touch 或 Apple Pencil (第 2 代）。</p>
                  </div>
                  <h5 class=" border-bottom">
                    客製化鐫刻需額外加價嗎?
                  </h5>
                  <div class="answer-item">
                    <p>此服務免額外付費。</p>
                  </div>
                  <h5 class=" border-bottom">
                    若商品要加上鐫刻，是否會延長出貨時間?
                  </h5>
                  <div class="answer-item">
                    <p>是，客製化產品需另加 2-3 個工作天時間。</p>
                  </div>
                  <h5 class=" border-bottom">
                    鐫刻文字是否可以中英文合併?
                  </h5>
                  <div class="answer-item">
                    <p>鐫刻服務僅可選擇單一語言，無法混合。</p>
                  </div>
                  <h5 class=" border-bottom">
                    積金/積分兌換 Apple® 商品保固期限是多久?
                  </h5>
                  <div class="answer-item">
                    <p>自商品從倉庫出貨後起計算一年。</p>
                  </div>
                  <h5 class=" border-bottom">
                    如何查詢我購買的商品保固期限?
                  </h5>
                  <div class="answer-item">
                    <p>
                      點擊
                      <a
                        href="https://checkcoverage.apple.com/tw/zh/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >https://checkcoverage.apple.com/tw/zh/</a> ，輸入iOS
                      裝置序號查看服務和支援保固狀態。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Q end -->
            <!-- Q start -->
            <div class="card">
              <div
                id="headingThree"
                class="card-header"
              >
                <h2 class="mb-0">
                  <button
                    class="btn w-100 collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    <span class="accordion-title">商品出貨相關</span>
                    <span class="icon-plus" />
                  </button>
                </h2>
              </div>
              <div
                id="collapseThree"
                class="collapse"
                aria-labelledby="headingThree"
                data-parent="#accordion"
              >
                <div class="card-body answer-content">
                  <h5 class=" border-bottom">
                    商品何時出貨?
                  </h5>
                  <div class="answer-item">
                    <p>各商品出貨時間不一，實際出貨時間以 Apple 倉庫庫存產品為主，出貨時會以電子郵件及簡訊通知。</p>
                  </div>
                  <h5 class=" border-bottom">
                    商品何時會送達?
                  </h5>
                  <div class="answer-item">
                    <p>
                      一旦您訂購的商品交至貨運公司運送，我們會寄封出貨通知電子郵件，並依據倉庫地點至您地址自動計算出來預寄運送日期。商品從倉庫出貨後正常可於 5
                      個工作天內送達。
                    </p>
                  </div>
                  <h5 class=" border-bottom">
                    如何查詢商品配送狀態?
                  </h5>
                  <div class="answer-item">
                    <p>您可以依照出貨通知電子郵件內提供的資訊追蹤商品狀態。</p>
                  </div>
                  <h5 class=" border-bottom">
                    需要負擔運送費用嗎?
                  </h5>
                  <div class="answer-item">
                    <p>兌換商品皆免負擔運送費用。</p>
                  </div>
                  <h5 class=" border-bottom">
                    商品是否可以寄送至台灣以外國家?
                  </h5>
                  <div class="answer-item">
                    <p>僅接受收貨地址在台灣地區的訂單。</p>
                  </div>
                  <h5 class=" border-bottom">
                    商品出貨後是否可以更改收件地址或電話號碼?
                  </h5>
                  <div class="answer-item">
                    <p>一旦商品出貨後，將無法更改收件地址或電話號碼。</p>
                  </div>
                  <h5 class=" border-bottom">
                    商品抵達收貨地址時，無人收件，商品會如何處置?
                  </h5>
                  <div class="answer-item">
                    <p>快遞員會留下一張聯繫通知單，您可直接與貨運業者聯繫，安排再次送貨時間。</p>
                  </div>
                  <h5 class=" border-bottom">
                    商品在運送過程中損壞或遺失怎麼辦?
                  </h5>
                  <div class="answer-item">
                    <p>如運送過程中發生任何問題，請聯繫肯驛國際客服。</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Q end -->
            <!-- Q start -->
            <div class="card">
              <div
                id="headingFour"
                class="card-header"
              >
                <h2 class="mb-0">
                  <button
                    class="btn w-100 collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    <span class="accordion-title">退貨相關</span>
                    <span class="icon-plus" />
                  </button>
                </h2>
              </div>
              <div
                id="collapseFour"
                class="collapse"
                aria-labelledby="headingFour"
                data-parent="#accordion"
              >
                <div class="card-body answer-content">
                  <h5 class=" border-bottom">
                    收到商品不滿意可以退貨嗎?
                  </h5>
                  <div class="answer-item">
                    <p>僅商品故障、瑕疵之商品才可辦理退貨。</p>
                  </div>
                  <h5 class=" border-bottom">
                    如何辦理退貨?
                  </h5>
                  <div class="answer-item">
                    <ul>
                      <li>
                        Step 1.
                        <span class="color-red">10 個日曆天內聯絡</span>
                        <a
                          href="https://getsupport.apple.com/"
                          target="_blank"
                        >Apple支援</a> ，確認是否符合退貨條件
                      </li>
                      <li>Step 2. 確認符合退貨條件後，Apple 會提供您一組 Apple Care ID</li>
                      <li>Step 3. 聯繫肯驛國際客服04-2206-2079，並提供 Apple Care ID及相關退貨資訊</li>
                      <li>Step 4. 待貨運業者於您指定的日期至您商品原先的寄送地址收貨</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- Q end -->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'FAQ'
}
</script>
