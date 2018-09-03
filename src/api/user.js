import request from '@/utils/request'

export function signIn (code) {
  return request({
    url: '/login',
    methods: 'post',
    data: {
      code: code
    }
  })
}

export function getMyInfo () {
  return request({
    url: '/user',
    method: 'get'
  })
}
