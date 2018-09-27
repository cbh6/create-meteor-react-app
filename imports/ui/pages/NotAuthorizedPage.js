import React from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage = () => (
  <Container>
    <Header as="h2">
      <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
      {' '}
Forbidden
    </Header>
    <Grid columns={1}>
      <Grid.Column>Sorry, you are not authorized to display this page!</Grid.Column>
    </Grid>
  </Container>
);

export default NotFoundPage;
