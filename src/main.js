import Vue from 'vue'
import App from './App'
import store from '@/store'

Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/preset/main',
      'pages/live/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#263238',
      backgroundColor: '#263238',
      navigationBarTitleText: '智慧酒店系统',
      navigationBarTextStyle: 'white'
    }
  }
}
