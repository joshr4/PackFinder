import io from 'socket.io-client'
import store, {
  getMessages,
  removeFriendSocket,
  acceptRequestSocket,
  removeSentRequestSocket
} from './store';

const socket = io(window.location.origin)
// this is front-end
socket.on('connect', () => {
  console.log('SOCKET CONNECTED TO SERVER!!!');
  socket.on('new-message', message => {
    console.log("new-message received in socket.js!!: ",
      message);
    store.dispatch(getMessages(message));
  });

  socket.on('delete-friend', data => {
    console.log('CLIENT SIDE DELETE-FRIEND', data)
    store.dispatch(removeFriendSocket(data.friendToDeleteId))
  })
  socket.on('accept-request', data => {
    console.log('CLIENT SIDE ACCEPT-FRIEND', data)
    store.dispatch(acceptRequestSocket(data.friend))
    store.dispatch(removeSentRequestSocket(data.friend.id))
  })
})

export default socket
