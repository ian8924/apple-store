<template>
  <footer
    id="footerbox"
    class="copyright"
  >
    <div class="container">
      <div class="row">
        <div class="col col-12 col-md-9 col-lg-10">
          <div class="logo">
            <img src="https://www.freeliving.com.tw/must/images/logo/canlead_w2.png">
          </div>
          <div class="txt">
            <ul>
              <li style="color: #fff;">
                服務提供商：肯驛國際(股)公司<span class="pl-2">公司統編：28940383</span>
              </li>
              <li style="color: #fff;">
                品牌系列：Best Gift精選好禮
              </li>
            </ul>
            <ul>
              <li style="color: #fff;">
                服務品牌：Apple Rewards Store
              </li>
              <li style="color: #fff;">
                客服專線 04-2206-3036
                <a
                  href="#"
                  class="pl-2 color-white"
                  @click="$router.push({name:'faq'})"
                >
                  購買須知
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col col-12 col-md-3 col-lg-2 p-0">
          <div class="certification">
            <div><img src="https://www.freeliving.com.tw/must/images/certification/27001.png">ISO27001認證</div>
            <div><img src="https://www.freeliving.com.tw/must/images/certification/9001.png">ISO9001認證</div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooterL2'
}
</script>

<style></style>
