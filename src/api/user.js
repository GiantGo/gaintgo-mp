import request from '@/utils/request'

export function signIn (data) {
  return request({
    url: '/Account',
    methods: 'post',
    data: {
      code: data.code,
      iv: data.iv,
      encryptedData: data.encryptedData
    }
  })
}

export function getMyInfo () {
  return request({
    url: '/Account',
    methods: 'get'
  })
}
