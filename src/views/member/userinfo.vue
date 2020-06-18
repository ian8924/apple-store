<template>
  <main>
    <!--  使用者資料頁面 -->
    <div
      v-if="!showEditComponent"
      class="container-fluid"
    >
      <div class="row customize-content">
        <div class="col-12 localnav-header">
          <p class="h2">
            您的帳戶設定
          </p>
        </div>
        <div class="col-12 info-content">
          <p class="h2">
            個人資料
          </p>
          <ListItemInfoUser
            v-for="(item, index) in arrayUserData"
            :key="index"
            :user-info="item"
            @click="goEditUserInfo('Info', item)"
          />
          <button
            type="button"
            class="btn-outline-red mt-3"
            @click="goEditUserInfo('Password', {})"
          >
            修改密碼
          </button>
        </div>
      </div>
    </div>
    <transition
      name="slide-fade"
      mode="out-in"
    >
      <component
        :is="curEditComponent"
        class="overflow-y container-fluid"
        :info="curEditInfo"
        @close="closeEditComponent"
      />
    </transition>
  </main>
</template>

<script>
import ListItemInfoUser from '@/components/ListItemAccount/ListItemInfoUser'
import DisplayCurrentEditInfo from '@/views/member/Section/DisplayCurrentEditInfo'
import DisplayEditPassword from '@/views/member/Section/DisplayEditPassword'

export default {
  name: 'UserInfo',
  components: {
    ListItemInfoUser,
    DisplayCurrentEditInfo,
    DisplayEditPassword
  },
  data: () => {
    return {
      curEditComponent: '',
      curEditInfo: {},
      showEditComponent: false
    }
  },
  computed: {
    data () {
      return this.$store.getters['member/user']
    },
    arrayUserData () {
      const data = this.data
      let arr = []
      if (!(data || false)) return arr
      arr = [
        { type: '電話', val: data.Mobile, notEditable: true },
        { type: '姓名', val: data.Name },
        { type: '信箱', val: data.Email },
        { type: '收件人地址', val: { city: data.City, area: data.Area, address: data.Address } }
      ]
      return arr
    }
  },
  methods: {
    // 選取編輯項目（使用者資訊或密碼）
    goEditUserInfo (event, info) {
      this.showEditComponent = true
      switch (event) {
        case 'Info':
          this.curEditComponent = 'DisplayCurrentEditInfo'
          break
        case 'Password':
          this.curEditComponent = 'DisplayEditPassword'
          return
        default:
          break
      }
      this.curEditInfo = info
    },
    // 取消編輯
    closeEditComponent () {
      this.showEditComponent = false
      this.curEditComponent = ''
    }
  }
}
</script>
