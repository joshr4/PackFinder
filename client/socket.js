import io from 'socket.io-client'
import store, {
  getMessages,
  removeFriendSocket,
  acceptRequestSocket,
  removeSentRequestSocket,
  declineRequestSocket,
  addRequestSocket,
  inviteUsersOnSocket
} from './store';

const socket = io(window.location.origin)
// this is front-end
socket.on('connect', () => {
  socket.on('new-message', message => {
    store.dispatch(getMessages(message));
  });

  // **************************
  // FRIENDS LIST SOCKETS
  // **************************

  socket.on('delete-friend', data => {
    store.dispatch(removeFriendSocket(data.friendToDeleteId))
  })
  socket.on('accept-request', data => {
    store.dispatch(acceptRequestSocket(data.userId))
    store.dispatch(removeSentRequestSocket(data.userId))
  })
  socket.on('decline-request', data => {
    store.dispatch(declineRequestSocket(data.userId))
    store.dispatch(removeSentRequestSocket(data.userId))
  })
  socket.on('cancel-sent-request', data => {
    store.dispatch(declineRequestSocket(data.userId))
    store.dispatch(removeSentRequestSocket(data.userId))
  })
  socket.on('add-sent-request', data => {
    store.dispatch(addRequestSocket(data.userId))
  })

  // **************************
  // EVENTS SOCKETS
  // **************************

  socket.on('event-invite', data => {
    console.log('Rx socket', data)
    let id = data.id
    let userId = data.userId
    store.dispatch(inviteUsersOnSocket({id}, [userId]))
  })
  // socket.on('accept-request', data => {
  //   store.dispatch(acceptRequestSocket(data.userId))
  //   store.dispatch(removeSentRequestSocket(data.userId))
  // })
  // socket.on('decline-request', data => {
  //   store.dispatch(declineRequestSocket(data.userId))
  //   store.dispatch(removeSentRequestSocket(data.userId))
  // })
  // socket.on('cancel-sent-request', data => {
  //   store.dispatch(declineRequestSocket(data.userId))
  //   store.dispatch(removeSentRequestSocket(data.userId))
  // })
  // socket.on('add-sent-request', data => {
  //   store.dispatch(addRequestSocket(data.userId))
  // })
})

export default socket
