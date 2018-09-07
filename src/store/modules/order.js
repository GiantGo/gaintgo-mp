import { getOrders } from '@/api/order'

const state = {
  orders: []
}

const getters = {
  orders: state => state.orders
}

const actions = {
  getOrders ({commit}) {
    return getOrders().then((response) => {
      commit('setOrders', response.data)
      return response.data
    })
  }
}

const mutations = {
  setOrders: (state, orders) => {
    state.orders = orders
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}