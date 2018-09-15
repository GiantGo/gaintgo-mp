import request from '@/utils/request'

// 获取音乐列表
export function getMusics (options) {
  return request({
    url: '/Music',
    methods: 'get',
    data: options
  })
}

// 获取音乐播放地址
export function getMusicUrl (musicId) {
  return request({
    url: '/Music/mp3url',
    methods: 'get',
    data: {
      id: musicId
    }
  })
}
