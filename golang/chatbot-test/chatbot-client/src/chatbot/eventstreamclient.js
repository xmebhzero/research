import React, { useState, useEffect, useRef } from "react";
import { TextField, Box, Grid, Button, Card, CardContent, Typography } from "@mui/material";

const EventStreamClient = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  useEffect(() => {
    if (isSendingMessage) {
      const eventSource = new EventSource("http://localhost:8000/sse");

      eventSource.onmessage = (event) => {
        setResponses((prevMessages) => [...prevMessages, event.data]);
      };

      return () => {
        eventSource.close();
      };
    }
  }, [isSendingMessage, setResponses]);

  const handleSendMessage = () => {
    setIsSendingMessage(true)
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
              id="username-sse"
              label="SSE Username"
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
              id="message-sse"
              label="SSE Message"
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

      {responses.map((response, index) => (
        <Card sx={{ maxWidth: 345, mb: 1 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              DUMMY
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {response}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default EventStreamClient;
