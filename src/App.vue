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
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
    background-color: #263238;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }

  .menu-wrapper .menu-item {
    display: table;
    width: 56px;
    height: 54px;
    line-height: 14px;
    padding: 0 12px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .menu-wrapper .menu-item.active {
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background: #fff;
    font-weight: 700;
  }

  .menu-wrapper .menu-item.active .text {
    border: none;
  }

  .menu-wrapper .menu-item .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: top;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }

  .menu-wrapper .menu-item .text {
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    position: relative;
    font-size: 12px;
  }
</style>
