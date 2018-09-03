const TokenKey = 'Token'

export function getToken () {
  return wx.getStorageSync(TokenKey)
}

export function setToken (token) {
  wx.setStorage({
    key: TokenKey,
    data: token
  })
}

export function removeToken () {
  return wx.removeStorageSync(TokenKey)
}
