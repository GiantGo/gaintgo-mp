<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover"/>
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model"/>
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy"/>
    </form>
    <button open-type="getUserInfo" class="counter" @click="getUserInfo">获取授权</button>
    <a href="/pages/live/main" class="counter">去往直播页面</a>
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
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    wx.request({
      url: 'https://runighcat.com/api/user/token',
      method: 'post',
      data: {
        'username': '15930181489',
        'password': 'Pass@word1'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.setStorage({
          key: 'token',
          data: res.data.token
        })
      }
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
    width: 128px;
    height: 128px;
    margin: 20px;
    border-radius: 50%;
  }

  .userinfo-nickname {
    color: #aaa;
  }

  .usermotto {
    margin-top: 20px;
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
