import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { UserProvider } from './context/useAuth';

const App = () => (
  <ThemeProvider theme={createTheme()}>
    <UserProvider>
      <ToastContainer />
      <Outlet />
    </UserProvider>
  </ThemeProvider>
);

export default App;
