import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import FormMessages from '../FormMessages';
import { loginValidationSchema } from '../../validation/user-schema';

const LoginForm = props => (
  <Formik
    validationSchema={loginValidationSchema}
    initialValues={{ email: '', password: '' }}
    onSubmit={(values, { setSubmitting }) => {
      const { history } = props;
      const { email, password } = values;
      Meteor.loginWithPassword(email, password, (err) => {
        setSubmitting(false);
        if (err) {
          Bert.alert(err.reason, 'danger');
          return false;
        }
        Bert.alert('Logged in', 'success');
        history.push('/');
      });
    }}
    render={({
      values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting,
    }) => (
      <Fragment>
        <FormMessages errors={errors} touched={touched} />
        <Form onSubmit={handleSubmit}>
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
          <Button fluid color="black" onClick={handleSubmit} disabled={isSubmitting} type="submit">
            Sign in
          </Button>
        </Form>
      </Fragment>
    )}
  />
);

LoginForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(LoginForm);
