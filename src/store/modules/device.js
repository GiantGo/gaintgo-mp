import { getRoomDevices } from '@/api/device'

const state = {
  devices: []
}

const getters = {
  devices: state => state.devices
}

const actions = {
  getRoomDevices ({commit}) {
    return getRoomDevices().then((response) => {
      commit('setDevices', response.data.rows)
    })
  }
}

const mutations = {
  setDevices: (state, devices) => {
    state.devices = devices
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
