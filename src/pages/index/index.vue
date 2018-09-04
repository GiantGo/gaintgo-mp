<template>
  <div class="container">
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="avatar" :src="avatar" background-size="cover"/>
      <div class="userinfo-nickname">
        <card :text="nickname"></card>
      </div>
    </div>
    <i-button open-type="getUserInfo" type="ghost" @getuserinfo="getUserInfo">左边弹出1</i-button>
    <i-button @click="toggleLeft1" type="ghost">左边弹出1</i-button>
    <i-button type="ghost" @click="handleOpen">action sheet</i-button>
    <i-drawer mode="left" :visible="showLeft1" @close="toggleLeft1">
      <view class="demo-container">
        单击遮罩层关闭
      </view>
    </i-drawer>
    <i-action-sheet :visible="visible" :actions="actions" show-cancel :cancel="handleCancel"
                    @click="handleClickItem" mask-closable="false">
      <view slot="header" style="padding: 16px">
        <view style="color: #444;font-size: 16px">确定吗？</view>
        <text>删除后无法恢复哦</text>
      </view>
    </i-action-sheet>
    <i-message id="message"/>
  </div>
</template>

<script>
import card from '@/components/card'
import { mapGetters } from 'vuex'
const {$Message} = require('../../../static/iview/base/index')
export default {
  data () {
    return {
      showLeft1: false,
      visible: false,
      actions: [
        {
          name: '删除',
          color: '#ed3f14'
        }
      ]
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
    toggleLeft1 () {
      this.showLeft1 = !this.showLeft1
    },
    getUserInfo (e) {
      const that = this

      that.$store.dispatch('setUserInfo', e.mp.detail.userInfo)
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    handleOpen () {
      this.visible = true
    },
    handleClickItem ({mp}) {
      const index = mp.detail.index + 1

      $Message({
        content: '点击了选项' + index
      })
    },
    handleCancel () {
      this.visible = false
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
