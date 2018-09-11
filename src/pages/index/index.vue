<template>
  <div class="container index-container">
    <div class="tips-container">
      <div class="tip">
        <span class="text">预设模式是您的房间还没分配之前的时候可以预先设置</span>
      </div>
      <div class="tip">
        <span class="text">实时控制模式是您的房间已经分配之后可以实时控制房间</span>
      </div>
    </div>
    <scroll-view scroll-y class="card-container">
      <i-button open-type="getUserInfo" type="success" @getuserinfo="getUserInfo" v-if="!token">获取订单</i-button>
      <div class="card" :title="order.orderTypeName"
           v-for="(order, index) in orders" :key="order.orderId">
        <div class="card-header">
          <div class="card-header-content">
            <div class="card-header-title">戴纳私逸酒店欢迎您</div>
          </div>
        </div>
        <div class="card-body">
          入住时间：{{order.startTime}} - {{order.endTime}}
        </div>
        <div class="card-footer">
          <button @click="shareSetting(order)" class="footer-btn">
            分享设置
          </button>
          <button @click="enterSetting(order)" class="footer-btn">
            进入设置
          </button>
        </div>
      </div>
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
  .index-container {
    flex-direction: column;
  }

  .tips-container {
    height: 100px;
    margin: 0 16px 0 16px;
    font-size: 14px;
    overflow: hidden;
    background: #e8e8e8;
    border: 1px solid #dddee1;
  }

  .card-container {
    flex: 1;
  }

  .card {
    margin: 10px 16px 0 16px;
    font-size: 14px;
    overflow: hidden;
    position: relative;
    background: #b7b7b7;
    border: 1px solid #dddee1;
    border-radius: 5px;
    padding: 0;
  }

  .card-header {
    display: flex;
    padding: 6px 16px;
    align-items: center
  }

  .card-header-content {
    flex: 1;
    text-align: left
  }

  .card-header-title {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    color: #1c2438
  }

  .card-header-extra {
    flex: 1;
    text-align: right;
    font-size: 14px;
    color: #80848f
  }

  .card-body {
    position: relative;
    padding: 6px 16px;
    color: #495060;
    font-size: 14px
  }

  .card-body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(.5);
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    border: 0 solid #e9eaec;
  }

  .card-footer {
    display: flex;
    position: relative;
    color: #80848f;
    font-size: 12px
  }

  .card-footer .footer-btn {
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    white-space: nowrap;
    user-select: none;
    font-size: 14px;
    border: 0 !important;
    position: relative;
    text-decoration: none;
    height: 44px;
    line-height: 44px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .1);
    background: #4a4142;
    color: #c3b783;
    width: 50%;
  }

  .card-footer .footer-btn:nth-of-type(1) {
   border-bottom-left-radius: 5px;
  }

  .card-footer .footer-btn:nth-of-type(2) {
    background: #352323;
    border-bottom-right-radius: 5px;
  }

</style>
