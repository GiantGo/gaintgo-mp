<template>
  <div class="container">
    <view class="menu-wrapper">
      <scroll-view scroll-y="true">
        <view v-for="(images, name) in defaultPictureBoxes" :key="name" class="menu-item"
              :class="{active: name === currentMenu}" @click="selectMenu(name, images)">
          <view class="text">
            {{name}}
          </view>
        </view>
      </scroll-view>
    </view>
    <scroll-view scroll-y="true" class="setting-wrapper">
      <view>
        {{name}}
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
      currentMenu: ''
    }
  },
  computed: {
    ...mapGetters([
      'defaultPictureBoxes'
    ])
  },
  components: {},
  methods: {
    selectMenu (name) {
      this.currentMenu = name
    }
  },
  onShow () {
    const that = this

    that.pictureBoxId = this.$root.$mp.query.pictureBoxId

    that.$store.dispatch('getPictureBox', that.pictureBoxId)
  }
}
</script>

<style scoped>
  .setting-wrapper {
    flex: 1;
  }
</style>
