import { signIn, getMyInfo } from '@/api/user'
import { setToken, removeToken } from '@/utils/token'

const state = {
  token: '',
  avatar: '',
  nickName: ''
}

const getters = {
  token: state => state.token,
  avatar: state => state.avatar,
  nickName: state => state.nickName
}

const actions = {
  signIn ({commit}, data) {
    return signIn(data).then(res => {
      setToken(res.data.token)
      commit('setToken', res.data.token)
    })
  },
  getMyInfo ({commit}) {
    return getMyInfo().then(res => {
      commit('setAvatar', res.data.avatarUrl)
      commit('setNickName', res.data.nickName)
    })
  },
  clearUserInfo ({commit}) {
    commit('setToken', '')
    commit('setAvatar', '')
    commit('setNickName', '')
    removeToken()
  }
}

const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setAvatar (state, avatar) {
    state.avatar = avatar
  },
  setNickName: (state, nickName) => {
    state.nickName = nickName
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
