//Para correr el servidor => npm run dev

const path = require('path');
const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000); //configuracion del puerto

//static file
app.use(express.static(path.join(__dirname, 'public'))); //configuramos para usar index.html

//start the server
const server = app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});


//WebSockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {

  socket.on('chat:message', (data) => {
    io.sockets.emit('chat:message', data);
  });

  socket.on('chat:typing', (username) => {
    socket.broadcast.emit('chat:typing', username);
  });

});
