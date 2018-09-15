import { formatDate } from '@/utils/index'
import { getOrder, getOrders } from '@/api/order'
import { getRoomDevices } from '@/api/device'
import { getPictureBox, getPictureBoxes, getDefaultPictureBoxes, uploadPicture } from '@/api/picture'
import { getMusics } from '@/api/music'

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
    action: 'getMusics',
    actionData: {
      keyword: '逆流成河',
      page: 1,
      pageSize: 10
    }
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
  defaultPictureBoxes: [],
  customPictureBox: [],
  musics: []
}

const getters = {
  devices: state => state.devices,
  menus: state => state.menus,
  orders: state => state.orders,
  pictureBox: state => state.pictureBox,
  pictureBoxes: state => state.pictureBoxes,
  defaultPictureBoxes: state => state.defaultPictureBoxes,
  musics: state => state.musics
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
      const result = {
        pictureBox: response[0].data,
        defaultPictureBoxes: response[1].data
      }
      commit('setPicturePicker', result)
      return result
    })
  },
  getPictureBoxes ({commit}, {orderId}) {
    return getPictureBoxes(orderId).then((response) => {
      commit('setPictureBoxes', response.data)
      return response.data
    })
  },
  uploadPicture ({commit}, filePath) {
    return uploadPicture(filePath).then(response => {
      commit('addCustomPicture', response.data)
    })
  },
  getMusics ({commit}, options) {
    return getMusics(options).then(response => {
      if (response.data) {
        commit('setMusics', response.data)
      }
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

    state.defaultPictureBoxes.forEach(picture => {
      if (picture.tagName === '自定义') {
        state.customPictureBox = picture
      }
    })
  },
  addCustomPicture (state, picture) {
    state.customPictureBox.files.push(JSON.parse(picture))
    console.log(state.defaultPictureBoxes)
  },
  setMusics (state, musics) {
    state.musics = musics
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
