<template>
  <div class="music-container">
    <div class="music" v-for="(music, index) in musics" :key="music.id">
      <img :src="music.albumPicUrl"/>
      <span>{{music.singerName}}</span>
      <button @click="play(music)"></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'musics'
    ])
  },
  methods: {
    play (music) {

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
