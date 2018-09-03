import { signIn, getMyInfo } from '@/api/user'
import { setToken, removeToken } from '@/utils/token'

const state = {
  email: '',
  avatar: '',
  nickname: '',
  token: '',
  roles: [],
  permissions: []
}

const getters = {
  email: state => state.email,
  avatar: state => state.avatar,
  nickname: state => state.nickname,
  token: state => state.token,
  roles: state => state.roles,
  permissions: state => state.permissions
}

const actions = {
  signIn ({commit}, code) {
    return signIn(code).then(({data}) => {
      setToken(data.token)
      commit('setToken', data.token)
    })
  },
  logout ({commit}) {
    commit('setEmail', '')
    commit('setAvatar', '')
    commit('setNickname', '')
    commit('setRoles', '')
    commit('setPermissions', '')
    commit('setToken', '')
    removeToken()
  },
  getMyInfo ({commit}) {
    return getMyInfo().then((response) => {
      let userInfo = response.data

      commit('setEmail', userInfo.email)
      commit('setAvatar', userInfo.avatar)
      commit('setRoles', userInfo.roles)
      commit('setPermissions', userInfo.permissions)
    })
  },
  setUserInfo ({commit}, userInfo) {
    commit('setNickname', userInfo.nickName)
    commit('setAvatar', userInfo.avatarUrl)
  }
}

const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setEmail (state, email) {
    state.email = email
  },
  setAvatar (state, avatar) {
    state.avatar = avatar
  },
  setNickname: (state, nickname) => {
    state.nickname = nickname
  },
  setRoles (state, roles) {
    state.roles = roles
  },
  setPermissions (state, permissions) {
    state.permissions = permissions
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
