<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="avatar" :src="avatar" background-size="cover"/>
      <div class="userinfo-nickname">
        <card :text="nickname"></card>
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
  </div>
</template>

<script>
import card from '@/components/card'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'nickname',
      'avatar'
    ])
  },
  components: {
    card
  },

  methods: {
    getUserInfo () {
      wx.getUserInfo({
        success: (res) => {
          this.$store.dispatch('setUserInfo', res.userInfo)
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
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
