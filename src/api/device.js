import request from '@/utils/request'

export function getRoomDevices () {
  return request({
    url: '/Device',
    methods: 'get'
  })
}
