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
</style>
