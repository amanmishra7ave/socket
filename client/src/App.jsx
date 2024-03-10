import { React, useEffect, useMemo, useState } from 'react';
import { io } from "socket.io-client";
import { Container, Button, TextField, Typography ,Box, Stack} from '@mui/material';
// import { Button, TextField, Typography } from 'react-dom/client';

const App = () => {
  const socket = useMemo(()=> io("http://localhost:3000"),[]);

  const [message,setMessage]=useState("");
  const [room,setRoom]=useState("");
  const [socketID,setSocketId]=useState("");
  const [messages,setMessages]=useState([]);

  const hadleSubmit=(e)=>{
    e.preventDefault();
    socket.emit("message",{message,room});
    setMessage("");
  }

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected", socket.id);
    });

    socket.on("receive-message",(data)=>{
      console.log(data);
      setMessages((messages)=>[...messages,data]);
    });
 
    socket.on("welcome",(s)=>{
      console.log(s);
    })


    return () => {
      socket.disconnect();
    };
  }, []);


  return <Container maxWidth="sm">
    <Box sx={{height:200}}/>
    <Typography variant="h6" component="div" gutterBottom>
      {socketID}
    </Typography>

    <Typography varient="h2" component="div" gutterBottom>
      {socket.id}
    </Typography>
    <form onSubmit={hadleSubmit}>
      <TextField 
      value={message}
      onChange={e=>setMessage(e.target.value)}
      id="outlined-basic" 
      label="Message" 
      varient="outlined" />
       <TextField 
      value={room}
      onChange={e=>setRoom(e.target.value)}
      id="outlined-basic" 
      label="Room" 
      varient="outlined" />
      <Button type="submit" variant="contained" color="primary">
        Send
      </Button>
    </form>
<Stack>
  {
    messages.map((m,i)=>(
      <Typography key={i} variant='h6' component="div" gutterBottom>
        {m }
      </Typography>
    ))
  }
</Stack>
  </Container>
}

export default App
