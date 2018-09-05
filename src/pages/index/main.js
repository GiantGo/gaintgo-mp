import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    'usingComponents': {
      'i-button': '../../static/iview/button/index',
      'i-drawer': '../../static/iview/drawer/index',
      'i-action-sheet': '../../static/iview/action-sheet/index',
      'i-message': '../../static/iview/message/index',
      'i-toast': '../../static/iview/toast/index'
    }
  }
}
