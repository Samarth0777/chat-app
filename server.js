const express=require('express');
const app=express();
const http=require('http').createServer(app);

const port=process.env.port || 3000;

app.use(express.static(__dirname + '/'))

http.listen(port,()=>{
    console.log(`Server started  on port ${port}`);
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})


//socket.io

const io=require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log("User Connected...");

    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })

})