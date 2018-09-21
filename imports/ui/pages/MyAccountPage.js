import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Container, Header, Segment, Message, Icon, Popup,
} from 'semantic-ui-react';

class MyAccountPage extends Component {
  state = {
    username: '',
    oldpassword: '',
    newpassword: '',
    error: '',
  };

  componentDidMount() {
    Meteor.call('getUserData', (err, res) => {
      if (err) {
        Bert.alert('There was an error trying to get your user data');
        return false;
      }

      this.setState({ username: res.username });
    });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { email, password } = this.state;
    const { history } = this.props;

    if (!this.validForm()) return false;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
        return false;
      }
      Bert.alert('Logged in', 'success');
      history.push('/');
    });
  };

  validForm = () => {
    const { username } = this.state;

    if (!username) {
      this.setState({ error: 'There are empty required fields' });
      return false;
    }
    return true;
  };

  render() {
    const {
      username, error, oldpassword, newpassword,
    } = this.state;
    return (
      <Container>
        <Header as="h1">My Account</Header>
        <Segment padded>
          <Message hidden={!error} color="red">
            {error}
          </Message>
          <Form>
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
            <Button fluid color="black" onClick={this.handleSubmit} type="submit">
              Save
            </Button>
          </Form>
          <Form>
            <Form.Input
              onChange={this.handleChange}
              value={oldpassword}
              name="oldpassword"
              fluid
              required
              label="Old password"
              type="password"
              placeholder="Old password"
            />
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
            <Button fluid color="black" onClick={this.changePassword} type="submit">
              Change password
            </Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}
