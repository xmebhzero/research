import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const WebSocketClient = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws");

    ws.current.onopen = () => console.log("WebSocket Connected");

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    ws.current.onclose = () => console.log("WebSocket Disconnected");

    return () => {
      ws.current.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (message) {
      const msg = {
        username,
        content: message,
      };
      ws.current.send(JSON.stringify(msg));
      setMessage("");
    }
  };

  return (
    <>
      <Box component="form" noValidate autoComplete="off">
        <Grid container>
          <Grid
            item
            md={4}
            sx={{
              m: 1,
            }}
          >
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username-websocket"
              label="Websocket Username"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid
            item
            md={4}
            sx={{
              m: 1,
            }}
          >
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="message-websocket"
              label="Websocket Message"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item md={2} sx={{ m: 1 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSendMessage}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>

      {messages.map((msg, index) => (
        <>
          {msg.is_loading && <CircularProgress />}

          {!msg.is_loading && (
            <Card sx={{ maxWidth: 345, mb: 1 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {msg.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {msg.content}
                </Typography>
              </CardContent>
            </Card>
          )}
        </>
      ))}
    </>
  );
};

export default WebSocketClient;
