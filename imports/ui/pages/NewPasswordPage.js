import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Header } from 'semantic-ui-react';
import ChangePasswordForm from '../components/Forms/ChangePasswordForm';

class NewPassword extends Component {
  state = { email: '' };

  componentDidMount() {
    const { match } = this.props;
    const { token } = match.params;

    Meteor.call('getEmailFromToken', token, (err, result) => {
      this.setState({
        email: result,
      });
    });
  }

  resetPassword = (values, { setSubmitting }) => {
    const { history, match } = this.props;
    const { token } = match.params;

    Accounts.resetPassword(token, values.password, (err) => {
      setSubmitting(false);
      err
        ? Bert.alert(
          `There was an error trying to reset your password: <strong>${err.message}</strong>`,
          'danger',
        )
        : history.push('/');
    });
  };

  render() {
    const { email } = this.state;
    return (
      <Grid centered columns={1}>
        <Grid.Column className="centered-form">
          <Header textAlign="center" as="h3">
            Reset your password
          </Header>
          <Segment>
            <Fragment>
              <p>{email}</p>
              <ChangePasswordForm buttonFluid submitMethod={this.resetPassword} />
            </Fragment>
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
