<template>
  <div class="container">
    <i-button open-type="getUserInfo" type="success" @getuserinfo="getUserInfo" v-if="!token">获取订单</i-button>
    <scroll-view scroll-y>
      <i-card :title="order.orderTypeName" extra="预设模式" class="card"
              v-for="(order, index) in orders" :key="order.orderId">
        <view slot="content">{{order.startTime}} - {{order.endTime}}</view>
        <view slot="footer" class="card-footer">
          <view class="footer-btn">
            <i-button @click="shareSetting(order)" type="primary" size="large" long="true">
              分享设置
            </i-button>
          </view>
          <view class="footer-btn">
            <i-button @click="enterSetting(order)" type="error" size="large" long="true">
              进入设置
            </i-button>
          </view>
        </view>
      </i-card>
    </scroll-view>
    <i-toast id="toast"/>
  </div>
</template>

<script>
import card from '@/components/card'
import { mapGetters } from 'vuex'

const {$Toast} = require('../../../static/iview/base/index')

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'token',
      'nickName',
      'avatar',
      'orders'
    ])
  },
  components: {
    card
  },
  methods: {
    getUserInfo (e) {
      const that = this

      if (e.mp.detail.errMsg.indexOf('deny') > -1) {
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
              return that.$store.dispatch('getMyInfo')
            }).then(() => {
              this.getOrders()
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
    getOrders () {
      const that = this

      that.$store.dispatch('getOrders').then((orders) => {

      }).catch(() => {
        $Toast({
          content: '未发现订单',
          type: 'warning'
        })
      })
    },
    shareSetting () {

    },
    enterSetting (order) {
      wx.navigateTo({
        url: '/pages/live/main?orderId=' + order.orderId
      })
    }
  },
  onReady () {
    if (this.token) {
      this.getOrders()
    }
  }
}
</script>

<style type="scss" scoped>
  .card {
    width: 100%;
  }

  .card .card-footer {
  }

  .card .card-footer .footer-btn {
    float: left;
    width: 50%;
  }
</style>
