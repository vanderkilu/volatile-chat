const express = require('express');
const app = express();

const server = app.listen(3000, function(err) {
    if (err) console.log(err);
    console.log('server is running');
});

const io = require('socket.io')(server);
io.on('connection', function(socket) {
    socket.on('SEND_MESSAGE', function(data) {
        io.emit('SENT_MESSAGE', data);
    })
    console.log(socket.id)
})