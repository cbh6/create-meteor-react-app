import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Header, Segment } from 'semantic-ui-react';
import UserProfileForm from '../components/Forms/UserProfileForm';
import ChangePasswordForm from '../components/Forms/ChangePasswordForm';

const MyAccountPage = (props) => {
  const changePassword = (values, { setSubmitting }) => {
    Meteor.call('changeUserPassword', Meteor.userId(), values.passwordConfirm, (err) => {
      setSubmitting(false);
      if (err) {
        Bert.alert(`There was an error trying to update your password ${err.message}`, 'danger');
        return false;
      }
      Bert.alert('Your password was updated successfully', 'success');
      // We need to wait 1 second before redirecting user to login
      // That's because meteor userId() does not update instantly
      setTimeout(() => {
        const { history } = props;
        history.push('/login');
      }, 1000);
    });
  };

  return (
    <Container>
      <Header as="h1">My Account</Header>
      <Segment padded>
        <UserProfileForm />
        <br />
        <ChangePasswordForm submitMethod={changePassword} />
      </Segment>
    </Container>
  );
};

export default withRouter(MyAccountPage);
