<template>
  <div class="setting-wrapper" v-if="currentMenu === '录音'">
    <div class="record">
      <text class="iconfont icon-maikefenghuatongyuyin"></text>
    </div>
    <div class="tips">
      <text class="iconfont icon-jiantou"></text>
      录制时长最多不超过十分钟哦~
    </div>
    <div class="voice-bar">
      <text class="iconfont icon-yuyin"></text>
      <text class="second">50"</text>
    </div>
    <div class="upload">
      <button class="upload-btn" @click="upload">
        确认上传
      </button>
    </div>
    <div class="tips">
      <text class="iconfont icon-jiantou"></text>
      点击确认上传会将录音上传到云端
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const {$Toast} = require('../../static/iview/base/index')

export default {
  data () {
    return {
      record: {},
      recorderManager: '',
      recordStatus: {
        recording: false,
        paused: true
      },
      tempFilePath: ''
    }
  },
  computed: {
    ...mapGetters([
      'order',
      'currentMenu'
    ])
  },
  watch: {
    currentMenu (menuName) {
      if (menuName === '录音') {
        this.getRecord()
      }
    }
  },
  methods: {
    getRecord () {
      const that = this

      that.$store.dispatch('getRecord', that.order.orderId).then(response => {
        that.record = response.data
      })
    },
    start () {
      const that = this

      if (!this.recorderManager) {
        this.recorderManager = wx.getRecorderManager()
      }

      this.recorderManager.onStart(() => {
        console.log('recorder start')
      })
      this.recorderManager.onPause(() => {
        console.log('recorder pause')
      })
      this.recorderManager.onStop((res) => {
        that.tempFilePath = res.tempFilePath
      })

      this.recorderManager.start({
        duration: 10000,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        format: 'mp3',
        frameSize: 50
      })
    },
    play () {
      if (this.tempFilePath) {
        const innerAudioContext = wx.createInnerAudioContext()
        innerAudioContext.autoplay = true
        innerAudioContext.src = this.tempFilePath
        innerAudioContext.onPlay(() => {
          console.log('开始播放')
        })
        innerAudioContext.onError((res) => {
          console.log(res.errMsg)
          console.log(res.errCode)
        })
      } else {
        $Toast({
          content: '请先录音',
          type: 'warning'
        })
      }
    },
    stop () {
      if (this.recorderManager) {
        this.recorderManager.stop()
      }
    },
    upload () {
      if (this.tempFilePath) {
        this.$store.dispatch('uploadRecord', {filePath: this.tempFilePath, orderId: this.order.orderId})
      } else {
        $Toast({
          content: '请先录音',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>
  .record {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    margin-top: 20px;
    border-radius: 50%;
    background: #99867f;
  }

  .record .iconfont {
    font-size: 50px;
    color: #ffffff;
  }

  .tips {
    font-size: 14px;
  }

  .tips .iconfont {
    color: #e66a1a;
  }

  .voice-bar {
    width: 170px;
    height: 35px;
    padding: 0 10px;
    background: #a5897e;
    border-radius: 5px;
  }

  .voice-bar .iconfont, .voice-bar .second {
    height: 35px;
    line-height: 35px;
  }

  .voice-bar .iconfont {
    color: #ffffff;
  }

  .voice-bar .second {
    float: right;
    font-size: 14px;
    color: #dedede;
  }

  .upload-btn {
    width: 150px;
    height: 44px;
    background: #574640;
    color: #ffffff;
  }

  .tips {
    margin-top: 15px;
  }

  .voice-bar, .upload {
    margin-top: 40px;
  }
</style>
