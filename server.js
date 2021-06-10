const express = require('express');
const app = express();
const server = require('http').Server(app);
const { v4: uuidv4 } = require('uuid');
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
const cors = require("cors");
const enforce = require("express-sslify");

const peerServer = ExpressPeerServer(server, {
    debug: true
});


const users = {};

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(cors({ origin: true }));


app.get('/home', (req, res) => {
    res.render('home')
});

app.get('/features', (req, res) => {
    res.render('features');
});

app.get('/join', (req, res) => {
    res.render('join');
});

app.use('/peerjs', peerServer);
app.get('/room', (req, res) => {
    res.redirect(`/${uuidv4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId, username) => {
        if (users[roomId]) users[roomId].push({ id: userId, name: username, video: true, audio: true });
        else users[roomId] = [{ id: userId, name: username, video: true, audio: true }];


        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId, username);
        socket.on('message', (message) => {
            io.in(roomId).emit('message', message, userId, username);
        });

        io.in(roomId).emit("participants", users[roomId]);
    })
})
io.on("disconnect", () => {
    socket.to(roomID).broadcast.emit("user-disconnected", userId, username);
})

server.listen(process.env.PORT || 2020);