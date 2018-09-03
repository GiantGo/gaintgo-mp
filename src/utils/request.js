import { getToken } from '@/utils/token'

// create an axios instance
const request = function (options) {
  return new Promise((resolve, reject) => {
    let header = {
      'Content-Type': 'application/json'
    }

    const token = getToken()

    if (token) {
      header['authorization'] = 'Bearer ' + token
    }

    wx.request({
      url: options.url,
      data: Object.assign({}, options.data),
      method: options.methods || 'GET',
      header: Object.assign(header, options.header),
      success: resolve,
      fail: function (error) {
        if (error.status === 401) {
          wx.navigateTo({url: 'pages/index/main'})
        }

        reject(error)
      }
    })
  })
}

export default request
