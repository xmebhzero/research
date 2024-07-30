import React from "react";
import {Grid} from '@mui/material';

import WebSocketClient from './websocketclient'
import EventStreamClient from "./eventstreamclient";

const Chatbot = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <WebSocketClient />
      </Grid>
      <Grid item xs={12} md={6}>
        <EventStreamClient />
      </Grid>
    </Grid>
  )
}

export default Chatbot;