<template>
  <div class="picture-container" v-show="currentMenu === '画框'">
    <div class="picture" v-for="(picture, index) in pictureBoxes" :key="picture.id">
      <img class="picture-img" :style="{width: picture.property.width, height: picture.property.height}"
           :src="picture.property.imageUrl" background-size="cover" @click="navigateToPicker(picture.id)"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      pictureBoxes: []
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
      if (menuName === '画框') {
        this.getPictureBoxes()
      }
    }
  },
  methods: {
    getPictureBoxes () {
      const that = this

      that.$store.dispatch('getPictureBoxes', that.order.orderId).then(response => {
        response.data.forEach(picture => {
          if (picture.property.width) {
            picture.property.width = (picture.property.width / 20) + 'px'
          }

          if (picture.property.height) {
            picture.property.height = (picture.property.height / 20) + 'px'
          }
        })

        that.pictureBoxes = response.data
      })
    },
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
