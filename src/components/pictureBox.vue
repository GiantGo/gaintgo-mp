<template>
  <div class="picture-container">
    <div class="picture" v-for="(picture, index) in pictureBoxes" :key="picture.id">
      <img class="picture-img" :style="{width: picture.property.width, height: picture.property.height}"
           :src="picture.property.imageUrl" background-size="cover" @click="navigateToPicker(picture.id)"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'pictureBoxes',
      'avatar'
    ])
  },
  methods: {
    navigateToPicker (pictureBoxId) {
      wx.navigateTo({url: '/pages/picturePicker/main?pictureBoxId=' + pictureBoxId})
    }
  }
}
</script>

<style scoped>
  .picture-container {
    padding: 10px;
  }

  .picture {
    display: inline-block;
  }
</style>
