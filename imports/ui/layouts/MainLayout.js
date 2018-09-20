import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => (
  <Fragment>
    <Header />
    <Segment basic className="site-content">
      {children}
    </Segment>
    <Footer />
  </Fragment>
);

MainLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default MainLayout;
