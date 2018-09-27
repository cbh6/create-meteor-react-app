import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Button, Form, Container, Header, Segment,
} from 'semantic-ui-react';
import FormMessages from '../components/FormMessages';
import { resetPasswordValidationSchema } from '../validation/user-schema';
import UserProfileForm from '../components/Forms/UserProfileForm';

const MyAccountPage = props => (
  <Container>
    <Header as="h1">My Account</Header>
    <Segment padded>
      <UserProfileForm />
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
              const { history } = props;
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

MyAccountPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(MyAccountPage);
