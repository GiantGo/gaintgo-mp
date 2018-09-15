import { getToken } from '@/utils/token'
import store from '@/store'

const service = function (options) {
  return new Promise((resolve, reject) => {
    let header = {
      'Content-Type': 'multipart/form-data'
    }

    const token = getToken()

    if (token) {
      header['X-Token'] = token
    }

    wx.uploadFile({
      url: 'https://shapi.yingxiaobu.com/miniprogram/v1' + options.url,
      formData: Object.assign({}, options.data),
      method: options.methods || 'GET',
      header: Object.assign(header, options.header),
      filePath: options.filePath,
      name: 'file',
      success: resolve,
      fail: function (error) {
        if (error.status === 401) {
          store.dispatch('clearUserInfo')
          wx.navigateTo({url: '/pages/index/main'})
        }

        reject(error)
      }
    })
  })
}

export default service
