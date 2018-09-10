import request from '@/utils/request'

export function getRoomDevices (orderId, deviceType) {
  return request({
    url: '/Device',
    methods: 'get',
    data: {
      orderId: orderId,
      deviceType: deviceType || ''
    }
  })
}
