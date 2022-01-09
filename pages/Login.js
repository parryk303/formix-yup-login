import * as React from 'react';
import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Input from './components/Input';
import Copyright from './components/Copyright';
import Router from 'next/router';

const id = 'client_id=q3ZJvixJoRKUKx2O9KpE10zhmT3HU1wUWrZFXBg0gHw';
const theme = createTheme();

export default function Login() {
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  });

  const initialValues = {
    email: '',
    password: ''
  };

  const onSubmit = (values) => {
    axios.post('https://reqres.in/api/login', values)
      .then(function (response) {
        console.log('LOGIN-SUCCESSFUL', response);
        setLoginSuccess('Youre in dude!');
        Router.push('/Success');
      })
      .catch(function (error) {
        console.log('LOGIN-FAILED', error);
        setLoginError('Username or password is incorrect');
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
      }} >
      <ThemeProvider theme={theme}>
        <Grid container component='main' sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(https://source.unsplash.com/random?snow&${id})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }} >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              {loginSuccess && <p style={{color: 'green'}}>{loginSuccess}</p>}
              {loginError && <p style={{color: 'red'}}>{loginError}</p>}
              <Form>
                <Input label='Email Address' name='email' type='email' />
                <Input label='Password' name='password' type='password' />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }} >
                  Sign In
                </Button>
              </Form>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Formik>
  );
}
