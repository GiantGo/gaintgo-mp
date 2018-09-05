<template>
  <div class="container">
    <i-button open-type="getUserInfo" type="success" @getuserinfo="getUserInfo">登 录</i-button>
    <i-toast id="toast"/>
  </div>
</template>

<script>
import card from '@/components/card'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/token'

const {$Toast} = require('../../../static/iview/base/index')

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'nickName',
      'avatar'
    ])
  },
  components: {
    card
  },
  methods: {
    getUserInfo (e) {
      const that = this

      if (e.mp.detail.errMsg === 'getUserInfo:fail auth deny') {
        return $Toast({
          content: '登录失败，请重新登录',
          type: 'warning'
        })
      }

      wx.login({
        success: (res) => {
          if (res.code) {
            that.$store.dispatch('signIn', {
              code: res.code,
              encryptedData: e.mp.detail.encryptedData,
              iv: e.mp.detail.iv
            }).then(() => {
              this.navigateToRoom()
            })
          }
        },
        fail: () => {
          $Toast({
            content: '登录失败，请重新登录',
            type: 'warning'
          })
        }
      })
    },
    navigateToRoom () {
      const that = this

      that.$store.dispatch('getRoomDevices').then(() => {
      }).catch(() => {
        $Toast({
          content: '未发现订单',
          type: 'warning'
        })
      })
    }
  },
  onReady () {
    if (getToken()) {
      this.navigateToRoom()
    }
  }
}
</script>

<style scoped>
  .demo-container {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>
