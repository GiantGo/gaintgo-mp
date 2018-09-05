import { signIn } from '@/api/user'
import { setToken, removeToken } from '@/utils/token'

const state = {
  avatar: '',
  nickName: ''
}

const getters = {
  avatar: state => state.avatar,
  nickName: state => state.nickName
}

const actions = {
  signIn ({commit}, data) {
    return signIn(data).then((res) => {
      setToken(res.data.token)
      commit('setAvatar', res.data.avatarUrl)
      commit('setNickName', res.data.nickName)
    })
  },
  logout ({commit}) {
    commit('setAvatar', '')
    commit('setNickName', '')
    removeToken()
  }
}

const mutations = {
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
