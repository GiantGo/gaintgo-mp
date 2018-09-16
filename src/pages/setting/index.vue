<template>
  <div class="container">
    <view class="menu-wrapper">
      <scroll-view scroll-y="true">
        <view v-for="(menu, index) in menus" :key="menu.name" v-if="!menu.disabled" class="menu-item"
              :class="{active: menu.name === currentMenu}" @click="selectMenu(menu)">
          <view class="text">
            {{menu.name}}
          </view>
        </view>
      </scroll-view>
    </view>
    <scroll-view scroll-y="true" class="setting-wrapper">
      <view v-show="currentMenu === '画框'">
        <picture-box></picture-box>
      </view>
      <view v-show="currentMenu === '音乐'">
        <music-list></music-list>
      </view>
      <view v-show="currentMenu === '录音'">
        <record></record>
      </view>
    </scroll-view>
    <i-toast id="toast"/>
  </div>
</template>

<script>
import pictureBox from '@/components/pictureBox'
import musicList from '@/components/musicList'
import record from '@/components/record'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      orderId: '',
      currentMenu: '灯光'
    }
  },
  computed: {
    ...mapGetters([
      'menus'
    ])
  },
  components: {
    pictureBox,
    musicList,
    record
  },
  methods: {
    selectMenu (menu) {
      this.currentMenu = menu.name

      if (menu.action) {
        this.$store.dispatch(menu.action, Object.assign({orderId: this.orderId}, menu.actionData))
      }
    }
  },
  onShow () {
    const that = this
    const query = this.$root.$mp.query

    that.orderId = query.orderId

    that.$store.dispatch('getOrder', {
      orderId: that.orderId
    }).then(() => {
      if (that.menus.length) {
        that.selectMenu(that.menus[0])
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
