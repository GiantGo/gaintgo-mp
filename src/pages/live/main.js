import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    'usingComponents': {
      'i-row': '../../static/iview/row/index',
      'i-col': '../../static/iview/col/index',
      'i-button': '../../static/iview/button/index',
      'i-toast': '../../static/iview/toast/index',
      'i-cell-group': '../../static/iview/cell-group/index',
      'i-cell': '../../static/iview/cell/index',
      'i-panel': '../../static/iview/panel/index',
      'i-grid': '../../static/iview/grid/index',
      'i-grid-item': '../../static/iview/grid-item/index',
      'i-grid-icon': '../../static/iview/grid-icon/index',
      'i-grid-label': '../../static/iview/grid-label/index'
    }
  }
}
