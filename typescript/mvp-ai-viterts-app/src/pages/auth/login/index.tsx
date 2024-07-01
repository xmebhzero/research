import React from 'react';

import { Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useAuth } from '../../../context/useAuth';

const LoginPage = () => {
  const { loginUser } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    loginUser(data.get('email') as string, data.get('password') as string);
  };

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>

        <Grid container>
          <Grid item xs>
            <Link href=";" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href=";" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoginPage;
