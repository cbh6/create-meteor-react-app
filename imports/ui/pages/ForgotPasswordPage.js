import React, { Component } from 'react';
import {
  Button, Form, Message, Header, Grid, Segment,
} from 'semantic-ui-react';

class ForgotPasswordPage extends Component {
  state = {
    error: '',
    email: '',
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;

    if (!email) {
      this.setState({
        error: 'Email required',
      });
      return;
    }

    Accounts.forgotPassword({ email }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      }
      Bert.alert(`Request sent to ${email}.`, 'success', 'growl-top-right');
    });
  };

  render() {
    const { error, email } = this.state;
    return (
      <Grid centered columns={1}>
        <Grid.Column className="centered-form">
          <Header textAlign="center" as="h3">
            Forgot password
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

export default ForgotPasswordPage;
