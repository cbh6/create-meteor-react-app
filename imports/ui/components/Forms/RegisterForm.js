import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import FormMessages from '../FormMessages';
import { registerValidationSchema } from '../../validation/user-schema';

const RegisterForm = (props) => {
  const login = (email, password) => {
    const { history } = props;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        Bert.alert(err.reason, 'danger');
        return false;
      }
      Bert.alert('Logged in', 'success');
      history.push('/');
    });
  };
  return (
    <Formik
      validationSchema={registerValidationSchema}
      initialValues={{ email: '', password: '', username: '' }}
      onSubmit={(values, { setSubmitting }) => {
        const { email, password, username } = values;
        Meteor.call('createNewUser', { email, password, username }, (err) => {
          if (err) {
            Bert.alert(err.reason, 'danger');
            return false;
          }
          setSubmitting(false);
          login(email, password);
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
              value={values.username}
              name="username"
              fluid
              required
              label="Username"
              type="text"
              placeholder="Username"
            />
            <Form.Input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              name="email"
              fluid
              required
              label="Email"
              type="Email"
              placeholder="Email"
            />
            <Form.Input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              name="password"
              fluid
              required
              label="Password"
              type="Password"
              placeholder="Password"
            />
            <Button
              fluid
              color="black"
              onClick={handleSubmit}
              disabled={isSubmitting}
              type="submit"
            >
              Sign up
            </Button>
          </Form>
        </Fragment>
      )}
    />
  );
};

RegisterForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(RegisterForm);
