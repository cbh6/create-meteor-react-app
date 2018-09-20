import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button, Form, Message, Header, Grid, Segment,
} from 'semantic-ui-react';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '' };
  }

  handleSubmit = () => {
    const { email, password } = this.state;
    const { history } = this.props;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
        return;
      }
      Bert.alert('Logged in', 'success', 'growl-top-right');
      history.push('/');
    });
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    const { error } = this.state;
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
                name="email"
                fluid
                required
                label="Email"
                type="Email"
                placeholder="Email"
              />
              <Form.Input
                onChange={this.handleChange}
                name="password"
                fluid
                required
                label="Password"
                type="Password"
                placeholder="Password"
              />
              <Button fluid color="blue" onClick={this.handleSubmit} type="submit">
                Sign in
              </Button>
            </Form>
          </Segment>
          <p className="login-subtitle">
            Not a member?
            {' '}
            <Link to="/register">Sign up here</Link>
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
