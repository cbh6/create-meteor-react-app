import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button, Form, Message, Header, Grid, Segment,
} from 'semantic-ui-react';
import Validators from '../../api/validators';

class LoginPage extends Component {
  state = { email: '', password: '', error: '' };

  componentDidMount() {
    throw new Error('I Crashed !!');
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
    const { email } = this.state;

    if (!email) {
      this.setState({ error: 'There are empty required fields' });
      return false;
    }

    if (!Validators.validMailString(email)) {
      this.setState({ error: 'Invalid email address' });
      return false;
    }

    return true;
  };

  render() {
    const { error, email, password } = this.state;
    return (
      <Grid centered columns={1}>
        <Grid.Column className="centered-form">
          <Header textAlign="center" as="h3">
            Please Sign in
          </Header>
          <Segment>
            <Message hidden={!error} color="red">
              {error}
            </Message>
            <Form>
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
                Sign in
              </Button>
            </Form>
          </Segment>
          <p className="login-subtitle">
            Not a member?
            {' '}
            <Link color="black" to="/register">
              Sign up here
            </Link>
          </p>
          <p className="login-subtitle">
            Forgot password?
            {' '}
            <Link to="/forgot-password">Click here</Link>
          </p>
        </Grid.Column>
      </Grid>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(LoginPage);
