import React from 'react';
import { Header, Grid, Segment } from 'semantic-ui-react';
import RegisterForm from '../components/Forms/RegisterForm';

const RegisterPage = () => (
  <Grid centered columns={1}>
    <Grid.Column className="centered-form">
      <Header textAlign="center" as="h3">
        Please Sign up
      </Header>
      <Segment>
        <RegisterForm />
      </Segment>
    </Grid.Column>
  </Grid>
);

export default RegisterPage;
