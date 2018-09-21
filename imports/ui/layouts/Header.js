import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class Header extends Component {
  state = { activeItem: '' };

  onLogout = (e) => {
    e.preventDefault();
    Meteor.logout(() => {
      const { history } = this.props;
      history.push('/login');
      this.setState({ activeItem: 'login' });
    });
  };

  handleItemClick = (e, { name }) => {
    const { history } = this.props;
    history.push(`/${name}`);
    this.setState({ activeItem: name });
  };

  render() {
    const { user } = this.props;
    const { activeItem } = this.state;

    return (
      <Menu inverted>
        <Menu.Item header>Meteor APP</Menu.Item>
        {Meteor.userId() ? (
          <Fragment>
            <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick} />
            {/* Logged user menu */}
            <Menu.Menu position="right">
              <Menu.Item name="logout" onClick={this.onLogout} />
              <Menu.Item>{user && user.username}</Menu.Item>
            </Menu.Menu>
          </Fragment>
        ) : (
          // Not logged user menu
          <Menu.Menu position="right">
            <Menu.Item
              name="register"
              active={activeItem === 'register'}
              as={Link}
              to="/register"
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="login"
              active={activeItem === 'login'}
              as={Link}
              to="/login"
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object.isRequired,
};

Header.defaultProps = {
  user: {},
};

export default withTracker(() => ({
  user: Meteor.user(),
}))(withRouter(Header));
