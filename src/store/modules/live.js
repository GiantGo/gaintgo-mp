import { formatDate } from '@/utils/index'
import { getOrder, getOrders } from '@/api/order'
import { getRoomDevices } from '@/api/device'
import { getPictureBox, getPictureBoxes, getDefaultPictureBoxes } from '@/api/picture'

const aiMenu = {
  name: '智能控制'
}
const authorizeMenu = {
  name: '授权'
}
const resetMenu = {
  name: '重置'
}
const deviceMenuMap = {
  '1': {
    name: '灯光',
    action: 'getLights'
  },
  '2': {
    name: '音乐',
    action: 'getMusics'
  },
  '3': {
    name: '录音',
    action: 'getRecords'
  },
  '4': {
    name: '画框',
    action: 'getPictureBoxes'
  },
  '5': {
    name: '味道',
    action: 'getTastes'
  }
}
const state = {
  menus: [],
  devices: [],
  orders: [],
  pictureBox: {},
  pictureBoxes: [],
  defaultPictureBoxes: []
}

const getters = {
  devices: state => state.devices,
  menus: state => state.menus,
  orders: state => state.orders,
  pictureBox: state => state.pictureBox,
  pictureBoxes: state => state.pictureBoxes,
  defaultPictureBoxes: state => state.defaultPictureBoxes
}

const actions = {
  getMenus ({commit}, {orderId}) {
    return Promise.all([getOrder(orderId), getRoomDevices(orderId)]).then((response) => {
      commit('setMenus', {
        orderInfo: response[0].data,
        devices: response[1].data
      })
    })
  },
  getOrders ({commit}) {
    return getOrders().then((response) => {
      response.data.forEach(order => {
        order.startTime = formatDate(order.startTime)
        order.endTime = formatDate(order.endTime)
      })

      commit('setOrders', response.data)
      return response.data
    })
  },
  getPictureBox ({commit}, pictureBoxId) {
    return Promise.all([getPictureBox(pictureBoxId), getDefaultPictureBoxes()]).then((response) => {
      commit('setPicturePicker', {
        pictureBox: response[0].data,
        defaultPictureBoxes: response[1].data
      })
      return response.data
    })
  },
  getPictureBoxes ({commit}, orderId) {
    return getPictureBoxes(orderId).then((response) => {
      commit('setPictureBoxes', response.data)
      return response.data
    })
  }
}

const mutations = {
  setDevices: (state, devices) => {
    state.devices = devices
  },
  setOrders: (state, orders) => {
    state.orders = orders
  },
  setMenus: (state, {orderInfo, devices}) => {
    state.menus = []

    if (orderInfo.roomId) {
      state.menus.push(aiMenu)
    }

    devices.map(device => {
      state.menus.push(deviceMenuMap[device.deviceType])
    })

    if (orderInfo.roomId) {
      state.menus.push(authorizeMenu)
      state.menus.push(resetMenu)
    }
  },
  setPictureBoxes: (state, pictureBoxes) => {
    pictureBoxes.forEach(picture => {
      if (picture.property.width) {
        picture.property.width = (picture.property.width / 20) + 'px'
      }

      if (picture.property.height) {
        picture.property.height = (picture.property.height / 20) + 'px'
      }
    })

    state.pictureBoxes = pictureBoxes
  },
  setPicturePicker: (state, {pictureBox, defaultPictureBoxes}) => {
    state.pictureBox = pictureBox
    state.defaultPictureBoxes = defaultPictureBoxes
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
