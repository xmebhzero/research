import React from "react";
import { TextField, Box } from "@mui/material";

const EventStreamClient = () => {
  return (
    <Box
      component="form"
      sx={{
        m: 2,
        p: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="input-eventstream" label="EventStream Message" variant="outlined" fullWidth />
    </Box>
  )
}

export default EventStreamClient;