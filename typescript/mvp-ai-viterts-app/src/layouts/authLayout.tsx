import React from 'react';
import { Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <Container component="main" maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Outlet />
    </Box>
  </Container>
);

export default AuthLayout;
