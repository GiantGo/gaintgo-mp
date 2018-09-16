<template>
  <div v-if="currentMenu === '录音'">
    <button @click="play">
      播放
    </button>
    <button @click="start">
      开始录音
    </button>
    <button @click="stop">
      结束
    </button>
    <button @click="upload">
      上传
    </button>
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

</style>
