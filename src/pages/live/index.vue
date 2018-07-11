<template>
  <div class="container">
    <live-player
      src="rtmp://25777.lssplay.aodianyun.com/smarket_test/stream20180711142726_447?k=343d652e542a75ad48a35d566ca89511&t=1531290446"
      autoplay @statechange="stateChange" @error="error"
      style="width: 100%; height: 225px;"/>
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
      wx.request({
        url: 'https://runighcat.com/api/user',
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
    },
    stateChange (e) {
      console.log('live-player code:', e.mp.detail.code)
    },
    error (e) {
      console.error('live-player error:', e.mp.detail.errMsg)
    }
  },

  created () {
    wx.connectSocket({
      url: 'wss://runighcat.com/ws',
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
