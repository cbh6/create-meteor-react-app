import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Grid, Segment } from 'semantic-ui-react';
import LoginForm from '../components/Forms/LoginForm';

const LoginPage = () => (
  <Grid centered columns={1}>
    <Grid.Column className="centered-form">
      <Header textAlign="center" as="h3">
        Please Sign in
      </Header>
      <Segment />
      <LoginForm />
      <p className="login-subtitle">
        Not a member?
        {' '}
        <Link color="black" to="/register">
          Sign up here
        </Link>
      </p>
      <p className="login-subtitle">
        Forgot password?
        {' '}
        <Link to="/forgot-password">Click here</Link>
      </p>
    </Grid.Column>
  </Grid>
);

export default LoginPage;
