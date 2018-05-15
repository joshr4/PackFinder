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
      if (currentUsers[data.friendId]) {
        io.to(currentUsers[data.friendId]).emit('delete-friend', {
          friendToDeleteId: data.userId
        })
      }
    });
    socket.on('accept-request', data => {
      if (currentUsers[data.friendId]) {
        io.to(currentUsers[data.friendId]).emit('accept-request', {
          userId: data.userId
        })
      }
    });
    socket.on('decline-request', data => {
      if (currentUsers[data.friendId]) {
        io.to(currentUsers[data.friendId]).emit('decline-request', {
          userId: data.userId
        })
      }
    });
    socket.on('cancel-sent-request', data => {
      if (currentUsers[data.friendId]) {
        io.to(currentUsers[data.friendId]).emit('cancel-sent-request', {
          userId: data.userId
        })
      }
    });
    socket.on('add-sent-request', data => {
      if (currentUsers[data.friendId]) {
        io.to(currentUsers[data.friendId]).emit('add-sent-request', {
          userId: data.userId
        })
      }
    });
  })
}
