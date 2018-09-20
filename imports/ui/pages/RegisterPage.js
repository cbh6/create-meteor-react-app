import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button, Form, Message, Header, Grid, Segment,
} from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

class RegisterPage extends Component {
  state = { email: '', password: '', error: '' };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { email, password } = this.state;
    const { history } = this.props;
    Accounts.createUser({ email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
        return;
      }
      Bert.alert('Account created. Logged in', 'success', 'growl-top-right');
      history.push('/');
    });
  };

  render() {
    const { error } = this.state;
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
