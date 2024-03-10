import { express } from "express";
import { Server } from 'socket.io';
import { createServer } from "http";

const app=express();
const server=createServer(app);
const io=new Server(server, {
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        Credential:true,
    },
});