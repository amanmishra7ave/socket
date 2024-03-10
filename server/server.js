const express = require('express');
const http=require('http');
const { Server }= require('socket.io');
const cors=require("cors");

const PORT=3000;

const app=express();
const server = http.createServer(app);
const io=new Server(server, {
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        Credential:true,
    },
});
// const io=new Server(server);

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Hello world");
});


io.on("connection",(socket)=>{
    // console.log("User Connected");
    console.log("User Connected",socket.id);
    // socket.broadcast.emit("Welcome",`Welcome to the server,${socket.id}`);

    socket.on("message",({room,message})=>{
        console.log({room,message});
        socket.to(room).emit("receive-message",message);
        // io.emit("receive-message",data);
    })

    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id);
    });
});

server.listen(PORT) 