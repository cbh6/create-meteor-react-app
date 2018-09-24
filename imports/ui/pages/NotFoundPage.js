import React from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage = () => (
  <Container>
    <Header as="h2">
      {/* <Icon name="warning sign" /> */}
      {/* <Icon loading name="spinner" /> */}
      <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
      {' '}
404 Not Found
    </Header>
    <Grid columns={1}>
      <Grid.Column>Sorry, the page you are trying to view does not exist!</Grid.Column>
    </Grid>
  </Container>
);

export default NotFoundPage;
