const express = require('express'); 
const {Server:ioServer} = require('socket.io'); 
const morgan = require('morgan'); 
const app = express();
const http = require('http'); 
const httpServer = http.createServer(app); 
const io = new ioServer(httpServer); 

const messages = []

//middlewares
app.use(morgan('dev')); 
app.use(express.static(__dirname+'/public')); 
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 








io.on('connection',(client) =>{
    console.log('websocket funcionando',client.id);
    client.emit('messages',messages)

    client.on('newMessage',message=>{
        messages.push(message);
        io.sockets.emit('messages',messages);  
    })
})





const PORT = 8080; 

httpServer.listen(PORT,()=>{
    console.log(`Server on port ${httpServer.address().port}`);
})




