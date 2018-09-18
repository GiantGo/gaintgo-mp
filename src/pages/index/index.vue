<template>
  <div class="container index-container">
    <scroll-view scroll-y class="card-container">
      <i-button open-type="getUserInfo" type="success" @getuserinfo="getUserInfo" v-if="!token">获取订单</i-button>
      <div class="tips-container">
        <div class="tip">
          <span class="text">
            <text class="iconfont icon-bofang"></text> 预设模式是您的房间还没分配之前的时候可以预先设置
          </span>
        </div>
        <div class="tip">
          <span class="text">
            <text class="iconfont icon-bofang"></text> 实时控制模式是您的房间已经分配之后可以实时控制房间
          </span>
        </div>
      </div>
      <div class="card" :title="order.orderTypeName"
           v-for="(order, index) in orders" :key="order.orderId">
        <div class="card-header">
          <div class="card-header-title">
            戴纳私逸酒店欢迎您
          </div>
        </div>
        <div class="card-body">
          <div class="order-date">
            入住时间：{{order.startTime}} - {{order.endTime}}
          </div>
          <div class="room-number">
            空间号码：2018
          </div>
        </div>
        <div class="card-footer">
          <button @click="shareSetting(order)" class="footer-btn">
            场景预设
          </button>
          <button @click="enterSetting(order)" class="footer-btn">
            实时控制
          </button>
        </div>
      </div>
    </scroll-view>
    <i-toast id="toast"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const {$Toast} = require('../../../static/iview/base/index')

export default {
  data () {
    return {
      orders: []
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'nickName',
      'avatar'
    ])
  },
  components: {},
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
            }).catch(() => {
              $Toast({
                content: '登录失败，请重新登录',
                type: 'warning'
              })
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
        that.orders = orders
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
      this.$socket.emit('joinroom', order.orderId)
      wx.navigateTo({
        url: '/pages/setting/main?orderId=' + order.orderId
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

<style scoped>
  button::after {
    border-radius: 0;
  }

  button {
    border-radius: 0;
  }

  .index-container {
    flex-direction: column;
  }

  .tips-container {
    display: flex;
    flex-direction: column;
    height: 100px;
    margin: 10px 25px 0 25px;
    font-size: 14px;
    overflow: hidden;
    background: #e8e8e8;
    border: 1px solid #dddee1;
    box-shadow: -2px 0 10px #d4d2d1, 0 -2px 10px #d4d2d1, 2px 0 10px #d4d2d1;
  }

  .tips-container .tip {
    flex: 1;
    padding: 8px 10px 0 10px;
  }

  .card-container {
    flex: 1;
  }

  .card {
    position: relative;
    margin: 10px 25px 0 25px;
    padding: 0;
    height: 130px;
    font-size: 14px;
    overflow: hidden;
    background: #e5e5e5;
    border: 1px solid #dddee1;
    border-radius: 5px;
  }

  .card-header {
    padding: 6px 16px;
    align-items: center;
  }

  .card-header-title {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    color: #1c2438
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
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #80848f;
    font-size: 12px;
  }

  .card-footer .footer-btn {
    float: left;
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
    color: #eae3e1;
    width: 50%;
  }

  .card-footer .footer-btn:nth-of-type(1) {
    background: #a5897e;
    border-bottom-left-radius: 5px;
  }

  .card-footer .footer-btn:nth-of-type(2) {
    background: #574640;
    border-bottom-right-radius: 5px;
  }

  .card-footer .footer-btn.disabled {
    background: #898989;
  }

</style>
