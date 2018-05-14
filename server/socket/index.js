let currentUsers = {}

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server
    has been made: ${socket.id}`)
    socket.on('join', (data) => {
      console.log('joind a socket room', data)
      currentUsers[data.userId] = socket.id
      console.log('SOCKET CURRENTUSERS', currentUsers)
      socket.join(data.userId); // We are using room of socket io
      console.log('socket after join - socket.rooms', socket.rooms)
    });

    socket.on('new-message', message => {
      // console.log(("NEW-MESSAGE " +
      //   " RECEIVED IN SOCKET/INDEX, broadcast.emit: "), message);
      socket.broadcast.emit('new-message', message);
    });
    socket.on('delete-friend', data => {
      console.log('BACKEND UPDATE FRIEND', data);
      if (currentUsers[data.friendId]) {
        io.to(currentUsers[data.friendId]).emit('delete-friend', {
          friendToDeleteId: data.userId
        })
      }
    });
    socket.on('accept-request', data => {
      console.log('BACKEND UPDATE accept-request');
      if (currentUsers[data.friendId]) {
        io.to(currentUsers[data.friendId]).emit('accept-request', {
          friend: data.friend
        })
      }
    });
  })
}
