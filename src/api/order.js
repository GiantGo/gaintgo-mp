import request from '@/utils/request'

export function getOrders () {
  return request({
    url: '/Order',
    methods: 'get'
  })
}
