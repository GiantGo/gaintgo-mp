<script>
export default {
  created () {
  },
  onLaunch () {
    const that = this

    wx.checkSession({
      success: function () {
        that.$store.dispatch('getMyInfo')
      },
      fail: function () {
        wx.login({
          success: (res) => {
            if (res.code) {
              this.$store.dispatch('signIn', res.code)
            }
          }
        })
      }
    })
  }
}
</script>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
</style>
