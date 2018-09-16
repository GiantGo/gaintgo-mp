import io from 'weapp.socket.io'

const socket = io.connect('https://smarthome.yingxiaobu.com', {
  path: '/socket.io'
})

export default socket
