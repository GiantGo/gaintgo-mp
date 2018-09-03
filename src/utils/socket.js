import io from 'weapp.socket.io'

const socket = io.connect('http://localhost/webinar', {
  path: '/socketio/socket.io'
})

export default socket
