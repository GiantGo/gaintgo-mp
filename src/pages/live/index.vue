<template>
  <div class="container">
    <live-player
      src="rtmp://25777.hlsplay.aodianyun.com/smarket_dev/stream20180710152103_412?k=94f1e8eb09a738dd600f0deefea4f604&t=1531207263"
      mode="RTC" autoplay bindstatechange="statechange" binderror="error"
      style="width: 300px; height: 225px;"/>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({url})
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = Object.assign({}, this.userInfo, res.userInfo)
              console.log(this.userInfo)
            }
          })
        }
      })

      wx.request({
        url: 'http://localhost:3000/api/user',
        method: 'get',
        header: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success: (res) => {
          this.userInfo = Object.assign({}, this.userInfo, res.data)
          console.log(this.userInfo)
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()

    wx.connectSocket({
      url: 'ws://localhost:3000/ws',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      protocols: ['protocol1'],
      method: 'GET'
    })
  }
}
</script>

<style scoped>
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .userinfo-avatar {
    width: 128 rpx;
    height: 128 rpx;
    margin: 20 rpx;
    border-radius: 50%;
  }

  .userinfo-nickname {
    color: #aaa;
  }

  .usermotto {
    margin-top: 150px;
  }

  .form-control {
    display: block;
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
  }

  .counter {
    display: inline-block;
    margin: 10px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
  }
</style>
