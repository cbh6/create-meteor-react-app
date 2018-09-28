import React from 'react';
import { Header, Container } from 'semantic-ui-react';

const HomePage = () => (
  <Container>
    <Header as="h1" textAlign="center">
      Welcome to your Meteor React App
    </Header>
    <div style={{ textAlign: 'center' }}>
      <img src="/img/meteor-logo.png" alt="Meteor Logo" height="200px" />
      <img src="/img/react-logo.png" alt="React Logo" height="200px" />
    </div>
  </Container>
);

export default HomePage;
