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
      <picture-box></picture-box>
      <music-list></music-list>
      <record></record>
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
      orderId: ''
    }
  },
  computed: {
    ...mapGetters([
      'menus',
      'currentMenu'
    ])
  },
  components: {
    pictureBox,
    musicList,
    record
  },
  methods: {
    selectMenu (menu) {
      this.$store.dispatch('selectMenu', menu)
      this.$emit('show', menu.name)

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
    })
  }
}
</script>

<style scoped>
  .setting-wrapper {
    flex: 1;
  }
</style>
