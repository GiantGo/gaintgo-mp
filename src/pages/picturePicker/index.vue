<template>
  <div class="container">
    <view class="menu-wrapper">
      <scroll-view scroll-y="true">
        <view v-for="(group, index) in defaultPictureBoxes" :key="group.tagName" class="menu-item"
              :class="{active: group.tagName === currentMenu}" @click="selectMenu(group)">
          <view class="text">
            {{group.tagName}}
          </view>
        </view>
      </scroll-view>
    </view>
    <scroll-view scroll-y="true" class="setting-wrapper">
      <view v-for="(file, index) in files" :key="file.fileUrl">
        <img :src="file.fileUrl"/>
      </view>
      <view v-show="currentMenu === '自定义'">
        <button @click="uploadFile">上传</button>
      </view>
    </scroll-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      pictureBoxId: '',
      currentMenu: '',
      files: []
    }
  },
  computed: {
    ...mapGetters([
      'defaultPictureBoxes'
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

          that.$store.dispatch('uploadPicture', tempFilePaths[0])
        }
      })
    }
  },
  onShow () {
    const that = this

    that.pictureBoxId = this.$root.$mp.query.pictureBoxId

    that.$store.dispatch('getPictureBox', that.pictureBoxId).then(() => {
      if (that.defaultPictureBoxes && that.defaultPictureBoxes.length) {
        that.currentMenu = that.defaultPictureBoxes[0].tagName
        that.files = that.defaultPictureBoxes[0].files
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
