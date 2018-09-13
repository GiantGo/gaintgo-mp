import request from '@/utils/request'

// 读取当前订单的所有设备
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
