const http = require('http')
const express = require('express')
const path = require('path')
const {Server} = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on('connection' , (socket) => {
    socket.on('message',(message) => {
        socket.broadcast.emit('message' , message)
    })
})

app.use(express.static(path.resolve('./Public')))

app.get('/' , (req,res) => {
    return res.sendFile('/Public/index.html')
})


const PORT = process.env.PORT || 3002
server.listen(PORT, () => {
    console.log(`server listening at : $(PORT)/`)
})