import { getToken, removeToken } from '@/utils/token'

const service = function (options) {
  return new Promise((resolve, reject) => {
    let header = {
      'Content-Type': 'application/json'
    }

    const token = getToken()

    if (token) {
      header['X-Token'] = token
    }

    wx.request({
      url: 'https://shapi.yingxiaobu.com/miniprogram/v1' + options.url,
      data: Object.assign({}, options.data),
      method: options.methods || 'GET',
      header: Object.assign(header, options.header),
      success: resolve,
      fail: function (error) {
        if (error.status === 401) {
          removeToken()
          wx.navigateTo({url: 'pages/index/main'})
        }

        reject(error)
      }
    })
  })
}

export default service
