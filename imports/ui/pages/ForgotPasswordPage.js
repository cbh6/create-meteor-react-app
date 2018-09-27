import React from 'react';
import { Header, Grid, Segment } from 'semantic-ui-react';
import ForgotPasswordForm from '../components/Forms/ForgotPasswordForm';

const ForgotPasswordPage = () => (
  <Grid centered columns={1}>
    <Grid.Column className="centered-form">
      <Header textAlign="center" as="h3">
        Forgot password
      </Header>
      <Segment>
        <ForgotPasswordForm />
      </Segment>
    </Grid.Column>
  </Grid>
);

export default ForgotPasswordPage;
