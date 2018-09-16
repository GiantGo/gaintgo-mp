import upload from '@/utils/upload'
import request from '@/utils/request'

// 获取我的录音
export function getRecord (orderId) {
  return request({
    url: '/Music/myvoice',
    methods: 'get',
    data: {
      orderId: orderId
    }
  })
}

// 上传画框图片
export function uploadRecord (filePath, orderId) {
  return upload({
    url: '/Music/upload/voice',
    methods: 'post',
    filePath: filePath,
    data: {
      orderId: orderId
    }
  })
}
