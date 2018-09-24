import React from 'react';
import {
  Container, Header, Icon, Grid,
} from 'semantic-ui-react';

const NotFoundPage = () => (
  <Container>
    <Header as="h2" textAlign="center">
      <Icon name="warning sign" />
      404 Not Found
    </Header>
    <Grid columns={1}>
      <Grid.Column>Sorry, the page you are trying to view does not exist!</Grid.Column>
    </Grid>
  </Container>
);

export default NotFoundPage;
