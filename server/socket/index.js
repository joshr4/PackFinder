module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server
    has been made: ${socket.id}`)
    socket.on('new-message', message => {
      console.log(("NEW-MESSAGE "
      + " RECEIVED IN SOCKET/INDEX, broadcast.emit: "), message);
      socket.broadcast.emit('new-message', message);
    });
    socket.on('update-friend', friend => {
      console.log('BACKEND UPDATE FRIEND', friend);
      socket.broadcast.emit('update-friend', friend);
    });


    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
