import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button, Form, Container, Header, Segment, Message,
} from 'semantic-ui-react';
import Validators from '../../api/validators';

class MyAccountPage extends Component {
  state = {
    username: '',
    email: '',
    newpassword: '',
    error: '',
  };

  componentDidMount() {
    Meteor.call('getUserData', (err, res) => {
      if (err) {
        Bert.alert('There was an error trying to get your user data', 'danger');
        return false;
      }

      this.setState({ username: res.username, email: res.emails[0].address });
    });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    if (!this.validForm()) return false;

    const { username } = this.state;
    const options = { username };

    Meteor.call('updateUserData', Meteor.userId(), options, (err) => {
      if (err) {
        Bert.alert(`There was an error trying to update your user data ${err.message}`, 'danger');
        return false;
      }
      Bert.alert('Your profile was updated successfully', 'success');
    });
  };

  validForm = () => {
    const { username } = this.state;

    if (!username) {
      this.setState({ error: 'There are empty required fields' });
      return false;
    }

    this.setState({ error: '' });
    return true;
  };

  changePassword = () => {
    const { newpassword } = this.state;

    if (!newpassword) {
      this.setState({ error: 'There are empty required fields' });
      return false;
    }

    if (!Validators.validPassword(newpassword, 6)) {
      this.setState({ error: 'Password must contain at least 6 characters' });
      return false;
    }

    this.setState({ error: '' });
    Meteor.call('changeUserPassword', Meteor.userId(), newpassword, (err) => {
      if (err) {
        Bert.alert(`There was an error trying to update your password ${err.message}`, 'danger');
        return false;
      }
      Bert.alert('Your password was updated successfully', 'success');

      // We need to wait 1 second before redirecting user to login
      // That's because meteor userId() does not update instantly
      setTimeout(() => {
        const { history } = this.props;
        history.push('/login');
      }, 1000);
    });
  };

  render() {
    const {
      username, email, error, newpassword,
    } = this.state;
    return (
      <Container>
        <Header as="h1">My Account</Header>
        <Segment padded>
          <Message hidden={!error} color="red">
            {error}
          </Message>
          <Form>
            <Form.Input value={email} fluid label="Email" type="email" readOnly />
            <Form.Input
              onChange={this.handleChange}
              value={username}
              name="username"
              fluid
              required
              label="Username"
              type="text"
              placeholder="Username"
            />
            <Button color="blue" onClick={this.handleSubmit} type="submit">
              Save
            </Button>
          </Form>
          <br />
          <Form>
            <Form.Input
              onChange={this.handleChange}
              value={newpassword}
              name="newpassword"
              fluid
              required
              label="New password"
              type="password"
              placeholder="New password"
            />
            <Button color="blue" onClick={this.changePassword} type="submit">
              Change password
            </Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

MyAccountPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(MyAccountPage);
