const express = require('express');
const http = require('http')
const app = express();
const path = require('path')

const server = http.createServer(app)

const io = require('socket.io')(server);
io.on('connection', function(socket) {
    socket.on('SEND_MESSAGE', function(data) {
        io.emit('SENT_MESSAGE', data);
    })
})

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, "ui", "dist")))
}
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "ui", "dist", "index.html"))
})

server.listen(process.env.PORT || 3000, function(err) {
    if (err) console.log(err);
    console.log('server is running');
});