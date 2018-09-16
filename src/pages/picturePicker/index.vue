<template>
  <div class="container">
    <div class="menu-wrapper">
      <scroll-view scroll-y="true">
        <view v-for="(group, index) in defaultPictureBoxes" :key="group.tagName" class="menu-item"
              :class="{active: group.tagName === currentMenu}" @click="selectMenu(group)">
          <view class="text">
            {{group.tagName}}
          </view>
        </view>
      </scroll-view>
    </div>
    <scroll-view scroll-y="true" class="setting-wrapper">
      <div v-for="(file, index) in files" :key="file.fileUrl">
        <div @click="toggleFile(file)">
          {{file.checked}}
          <img :src="file.fileUrl"/>
        </div>
      </div>
      <div v-show="currentMenu === '自定义'">
        <button @click="uploadFile">上传</button>
      </div>
      <button @click="savePictureBox">保存</button>
    </scroll-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      pictureBox: {},
      defaultPictureBoxes: [],
      customPictureBox: {},
      currentMenu: '',
      files: []
    }
  },
  computed: {
    ...mapGetters([
      'order'
    ])
  },
  components: {},
  methods: {
    selectMenu (group) {
      this.currentMenu = group.tagName
      this.files = group.files
    },
    uploadFile () {
      const that = this

      wx.chooseImage({
        count: 10 - that.files.length,
        success: function (res) {
          const tempFilePaths = res.tempFilePaths

          that.$store.dispatch('uploadPicture', {
            filePath: tempFilePaths[0],
            orderId: that.order.orderId
          }).then(response => {
            that.customPictureBox.files.push(JSON.parse(response.data))
          })
        }
      })
    },
    toggleFile (file) {
      file.checked = !file.checked
    },
    savePictureBox () {
      const that = this
      let imagesUrl = []

      that.defaultPictureBoxes.forEach(pictureBox => {
        pictureBox.files.forEach(file => {
          if (file.checked) {
            imagesUrl.push(file.fileUrl)
          }
        })
      })

      that.$store.dispatch('savePictureBox', Object.assign({}, that.pictureBox, {imagesUrl: imagesUrl}))
    }
  },
  onShow () {
    const that = this
    const query = this.$root.$mp.query

    that.$store.dispatch('getPictureBox', query.pictureBoxId).then((response) => {
      that.pictureBox = response[0].data
      that.defaultPictureBoxes = response[1].data

      if (that.defaultPictureBoxes && that.defaultPictureBoxes.length) {
        that.defaultPictureBoxes.forEach(pictureBox => {
          if (pictureBox.tagName === '自定义') {
            that.customPictureBox = pictureBox
          }

          pictureBox.files.forEach(file => {
            file.checked = that.pictureBox.imagesUrl.indexOf(file.fileUrl) > -1
          })
        })

        that.selectMenu(that.defaultPictureBoxes[0])
      }
    })
  }
}
</script>

<style scoped>
  .setting-wrapper {
    flex: 1;
  }
</style>
