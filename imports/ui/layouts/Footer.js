import React from 'react';
import { Header } from 'semantic-ui-react';

const Footer = () => (
  <div className="ui inverted vertical footer segment">
    <div className="ui center aligned container">
      <Header as="h4" inverted textAlign="center">
        &copy; Copyright
        {' '}
        {new Date().getFullYear()}
        {' '}
| All rights reserved
      </Header>
    </div>
  </div>
);

export default Footer;
