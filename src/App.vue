<script>
import { getToken } from '@/utils/token'

export default {
  created () {
  },
  onLaunch () {
    if (getToken()) {
      this.$store.commit('setToken', getToken())
      this.$store.dispatch('getMyInfo')
    }
  }
}
</script>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
    background-color: #e9e3e1;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }

  button {
    font-size: 14px;
    height: 44px;
    line-height: 44px;
  }

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #e4e4e4;
  }

  .menu-wrapper .menu-item {
    text-align: center;
    width: 80px;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    padding: 5px 0;
  }

  .menu-wrapper .menu-item.active {
    position: relative;
    z-index: 10;
    background: #ffffff;
  }

  .menu-wrapper .menu-item.active .text {
    border-right: 2px solid #e66a1a;
    font-weight: normal;
    box-sizing: border-box;
  }

  .menu-wrapper .menu-item .text {
    width: 80px;
    vertical-align: middle;
    position: relative;
    font-size: 14px;
  }

  .setting-wrapper {
    display: flex;
    flex: 1;
  }
</style>
