<template>
  <div class="device-container">
    <view class="menu-wrapper">
      <scroll-view scroll-y="true">
        <view v-for="(menu, index) in menus" :key="menu.name" v-if="!menu.disabled" class="menu-item"
              :class="{active: menu.name === currentMenu}" @click="selectMenu(menu.name)">
          <view class="text">
            {{menu.name}}
          </view>
        </view>
      </scroll-view>
    </view>
    <scroll-view scroll-y="true" class="setting-wrapper">
    </scroll-view>
  </div>
</template>

<script>
import card from '@/components/card'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      currentMenu: '灯光'
    }
  },
  computed: {
    ...mapGetters([
      'menus'
    ])
  },
  components: {
    card
  },
  methods: {
    selectMenu (name) {
      this.currentMenu = name
    }
  },
  onShow () {
    const that = this

    that.$store.dispatch('getMenus', {
      orderId: this.$root.$mp.query.orderId
    }).then(() => {
      if (that.menus.length) {
        that.currentMenu = that.menus[0].name
      }
    })
  }
}
</script>

<style scoped>
  .device-container {
    display: flex;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  .device-container .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }

  .device-container .menu-wrapper .menu-item {
    display: table;
    width: 56px;
    height: 54px;
    line-height: 14px;
    padding: 0 12px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .device-container .menu-wrapper .menu-item.active {
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background: #fff;
    font-weight: 700;
  }

  .device-container .menu-wrapper .menu-item.active .text {
    border: none;
  }

  .device-container .menu-wrapper .menu-item .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: top;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }

  .device-container .menu-wrapper .menu-item .text {
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    position: relative;
    font-size: 12px;
  }

  .device-container .setting-wrapper {
    flex: 1;
  }
</style>
