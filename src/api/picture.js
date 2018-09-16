import request from '@/utils/request'
import upload from '@/utils/upload'

// 读取当前订单下所有的画框(含空间代码屏)
export function getPictureBox (pictureBoxId) {
  return request({
    url: '/PictureBox/' + pictureBoxId,
    methods: 'get'
  })
}

// 读取当前订单下所有的画框(含空间代码屏)
export function getPictureBoxes (orderId) {
  return request({
    url: '/PictureBox',
    methods: 'get',
    data: {
      orderId: orderId
    }
  })
}

// 获取默认画框列表
export function getDefaultPictureBoxes () {
  return request({
    url: '/PictureBox/piclist',
    methods: 'get'
  })
}

// 上传画框图片
export function uploadPicture (filePath, orderId) {
  return upload({
    url: '/PictureBox',
    methods: 'post',
    filePath: filePath,
    data: {
      orderId: orderId
    }
  })
}

// 获取默认画框列表
export function savePictureBox (pictureBox) {
  return request({
    url: '/PictureBox',
    methods: 'put',
    data: pictureBox
  })
}
