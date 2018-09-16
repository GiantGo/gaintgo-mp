<template>
  <div class="music-container">
    <input placeholder="请输入歌曲名称" auto-focus v-model="keywords"/>
    <button @click="searchMusic">搜索</button>
    <div class="music" v-for="(music, index) in musicPager.rows" :key="music.id">
      <img :src="music.albumPicUrl"/>
      <span>{{music.singerName}}</span>
      <button @click="switchMusic(music)">
        {{(currentMusic.id === music.id && !currentMusic.paused) ? '暂停' : '播放'}}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const {$Toast} = require('../../static/iview/base/index')

export default {
  data () {
    return {
      musicPager: {
        rows: [],
        total: 0,
        page: 1,
        pageSize: 10
      },
      keywords: '',
      innerAudioContext: '',
      currentMusic: {
        id: '',
        paused: true
      }
    }
  },
  computed: {
    ...mapGetters([
      'order'
    ])
  },
  methods: {
    searchMusic () {
      const that = this

      that.$store.dispatch('getMusics', {
        keywords: that.keywords,
        isPreSetting: that.order.isPreSetting,
        page: that.musicPager.page,
        pageSize: that.musicPager.pageSize
      }).then(response => {
        that.musicPager.rows = response.data.rows
        that.musicPager.total = response.data.total
      })
    },
    switchMusic (music) {
      const that = this

      if (!music.src) {
        this.$store.dispatch('getMusicSrc', music).then(response => {
          music.src = response.data
          that.play(music)
        }).catch(() => {
          $Toast({
            content: '获取音乐失败，请重试',
            type: 'warning'
          })
        })
      } else {
        that.play(music)
      }
    },
    play (music) {
      if (this.currentMusic.id === music.id) {
        if (this.currentMusic.paused) {
          this.innerAudioContext.play()
          this.currentMusic.paused = false
        } else {
          this.innerAudioContext.pause()
          this.currentMusic.paused = true
        }
      } else {
        if (this.innerAudioContext) {
          this.innerAudioContext.destroy()
        }

        this.currentMusic.id = music.id
        this.currentMusic.paused = false
        this.innerAudioContext = wx.createInnerAudioContext()
        this.innerAudioContext.autoplay = true
        this.innerAudioContext.src = music.src
        this.innerAudioContext.onPlay(() => {
          console.log('开始播放')
        })
        this.innerAudioContext.onError((res) => {
          console.log(res.errMsg)
          console.log(res.errCode)
        })
      }
    },
    navigateToPicker (pictureBoxId) {
      wx.navigateTo({url: '/pages/musicPicker/main?pictureBoxId=' + pictureBoxId})
    }
  }
}
</script>

<style scoped>
  .music-container {
    padding: 10px;
  }

  .music {
    display: inline-block;
  }
</style>
