const express = require('express')
const app = express();
const cors = require('cors')
const LocalStorage= require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch');
const http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors: {
        origin: '*',
        methods: ["GET","POST"],

    }
})
const sockets = require('./sockets.js')
const server = require('./listen.js')
const amount = ""

const PORT = 3200





console.log(io.sockets.adapter.rooms)

app.use(cors());
sockets.connect(io,PORT)
server.listen(http,PORT)