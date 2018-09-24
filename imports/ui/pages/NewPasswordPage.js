import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Message, Grid, Segment, Form, Button, Header,
} from 'semantic-ui-react';
import Validators from '../../api/validators';

class NewPassword extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  componentDidMount() {
    const { token } = this.props.match.params;

    Meteor.call('getEmailFromToken', token, (err, result) => {
      this.setState({
        email: result,
      });
    });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { history, match } = this.props;
    const { token } = match.params;
    const { password } = this.state;

    if (!this.validForm()) return false;
    Accounts.resetPassword(token, password, (err) => {
      err ? this.setState({ error: err.reason }) : history.push('/');
    });
  };

  validForm = () => {
    const { password, confirmPassword } = this.state;

    if (!password || !confirmPassword) {
      this.setState({ error: 'There are empty required fields' });
      return false;
    }

    if (!Validators.validPassword(password, 6)) {
      this.setState({ error: 'Password must contain at least 6 characters' });
      return false;
    }

    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords must match' });
      return false;
    }

    return true;
  };

  render() {
    const {
      email, password, confirmPassword, error,
    } = this.state;
    return (
      <Grid centered columns={1}>
        <Grid.Column className="centered-form">
          <Header textAlign="center" as="h3">
            Reset your password
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
              />
              <Form.Input
                onChange={this.handleChange}
                value={confirmPassword}
                name="confirmPassword"
                fluid
                required
                label="Confirm Password"
                type="Password"
              />
              <Button fluid color="black" onClick={this.handleSubmit} type="submit">
                Submit
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

NewPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.object.isRequired,
};

export default NewPassword;
