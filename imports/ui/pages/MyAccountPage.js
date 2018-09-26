import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Button, Form, Container, Header, Segment,
} from 'semantic-ui-react';
import FormMessages from '../components/FormMessages';
import { resetPasswordValidationSchema, profileValidationSchema } from '../validation/user-schema';

class MyAccountPage extends Component {
  state = {
    username: '',
    email: '',
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

  render() {
    const { username, email } = this.state;
    return (
      <Container>
        <Header as="h1">My Account</Header>
        <Segment padded>
          <Formik
            validationSchema={profileValidationSchema}
            initialValues={{ email, username }}
            enableReinitialize
            onSubmit={(values, { setSubmitting }) => {
              const options = { username: values.username };

              Meteor.call('updateUserData', Meteor.userId(), options, (err) => {
                if (err) {
                  Bert.alert(
                    `There was an error trying to update your user data ${err.message}`,
                    'danger',
                  );
                  return false;
                }
                Bert.alert('Your profile was updated successfully', 'success');
                setSubmitting(false);
              });
            }}
            render={({
              values,
              touched,
              errors,
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
            }) => (
              <Fragment>
                <FormMessages errors={errors} touched={touched} />
                <Form>
                  <Form.Input value={values.email} fluid label="Email" type="email" readOnly />
                  <Form.Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    name="username"
                    fluid
                    required
                    label="Username"
                    type="text"
                    placeholder="Username"
                  />
                  <Button color="blue" onClick={handleSubmit} disabled={isSubmitting} type="submit">
                    Save
                  </Button>
                </Form>
              </Fragment>
            )}
          />
          <br />
          <Formik
            validationSchema={resetPasswordValidationSchema}
            initialValues={{ password: '', passwordConfirm: '' }}
            onSubmit={(values, { setSubmitting }) => {
              Meteor.call('changeUserPassword', Meteor.userId(), values.passwordConfirm, (err) => {
                if (err) {
                  Bert.alert(
                    `There was an error trying to update your password ${err.message}`,
                    'danger',
                  );
                  return false;
                }
                Bert.alert('Your password was updated successfully', 'success');
                setSubmitting(false);
                // We need to wait 1 second before redirecting user to login
                // That's because meteor userId() does not update instantly
                setTimeout(() => {
                  const { history } = this.props;
                  history.push('/login');
                }, 1000);
              });
            }}
            render={({
              values,
              touched,
              errors,
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
            }) => (
              <Fragment>
                <FormMessages errors={errors} touched={touched} />
                <Form>
                  <Form.Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    name="password"
                    fluid
                    label="New password"
                    type="password"
                    placeholder="New password"
                  />
                  <Form.Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConfirm}
                    name="passwordConfirm"
                    fluid
                    label="Confirm Password"
                    type="Password"
                    placeholder="Confirm Password"
                  />
                  <Button color="blue" onClick={handleSubmit} disabled={isSubmitting} type="submit">
                    Change password
                  </Button>
                </Form>
              </Fragment>
            )}
          />
        </Segment>
      </Container>
    );
  }
}

MyAccountPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(MyAccountPage);
