import request from '@/utils/request'

export function getOrders () {
  return request({
    url: '/Order',
    methods: 'get'
  })
}

export function getOrder (orderId) {
  return request({
    url: '/Order/' + orderId,
    methods: 'get'
  })
}
