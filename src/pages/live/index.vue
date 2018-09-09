<template>
  <div class="device-container">
    <view class="menu-wrapper">
      <scroll-view scroll-y="true" :style="{height: panelHeight}">
        <view v-for="(menu, index) in menus" :key="menu.name" class="menu-item border-1px" @click="selectMenu">
          <view class="text">
            {{menu.name}}
          </view>
        </view>
      </scroll-view>
    </view>
  </div>
</template>

<script>
import card from '@/components/card'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      panelHeight: '',
      menus: [{
        name: '灯光'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'nickName',
      'avatar',
      'orders'
    ])
  },
  components: {
    card
  },
  methods: {
    selectMenu () {

    }
  },
  created () {
    this.panelHeight = 1000
  }
}
</script>

<style scoped>
  .device-container {
    display: flex;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 46px;
    overflow: hidden;
    font-family: "微软雅黑";
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
  }

  .device-container .menu-wrapper .menu-item:current {
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background: #fff;
    font-weight: 700;
  }

  .device-container .menu-wrapper .menu-item:current .text {
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
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }


</style>
