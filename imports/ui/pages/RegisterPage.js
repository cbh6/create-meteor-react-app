import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button, Form, Message, Header, Grid, Segment,
} from 'semantic-ui-react';
import Validators from '../../api/validators';

class RegisterPage extends Component {
  state = {
    email: '',
    password: '',
    username: '',
    error: '',
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { email, password, username } = this.state;

    if (!this.validForm()) return false;

    Meteor.call('createNewUser', { email, password, username }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
        return false;
      }
      this.login(email, password);
    });
  };

  login = (email, password) => {
    const { history } = this.props;
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
    const { email, password, username } = this.state;

    if (!email || !password || !username) {
      this.setState({ error: 'There are empty required fields' });
      return false;
    }

    if (!Validators.validMailString(email)) {
      this.setState({ error: 'Invalid email address' });
      return false;
    }

    if (!Validators.validPassword(password, 6)) {
      this.setState({ error: 'Password must contain at least 6 characters' });
      return false;
    }

    return true;
  };

  render() {
    const {
      error, username, email, password,
    } = this.state;
    return (
      <Grid centered columns={1}>
        <Grid.Column className="centered-form">
          <Header textAlign="center" as="h3">
            Please Sign up
          </Header>
          <Segment>
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
              <Form.Input
                onChange={this.handleChange}
                value={email}
                name="email"
                fluid
                required
                label="Email"
                type="Email"
                placeholder="Email"
              />
              <Form.Input
                onChange={this.handleChange}
                value={password}
                name="password"
                fluid
                required
                label="Password"
                type="Password"
                placeholder="Password"
              />
              <Button fluid color="black" onClick={this.handleSubmit} type="submit">
                Sign up
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

RegisterPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(RegisterPage);
