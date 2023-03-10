const server = require('express')();
const http = require('http').createServer(server);
// const io = require('socket.io')(http);

const url = "http://localhost:3100"

const io = require('socket.io')(http, {

    origins: url, // http(s)://...
    cors: {
      origin: url,
    //   credentials: true
    }
  })

let players = [];
io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    players.push(socket.id);

    if (players.length === 1) {
        io.emit('isPlayerA');
    };

    socket.on('dealCards', function () {
        io.emit('dealCards');
    });

    socket.on('cardPlayed', function (gameObject, isPlayerA) {
        io.emit('cardPlayed', gameObject, isPlayerA);
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        players = players.filter(player => player !== socket.id);
    });
});

http.listen(3000, function () {
    console.log('Server started!');
});