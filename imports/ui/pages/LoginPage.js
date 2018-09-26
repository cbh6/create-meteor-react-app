import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Button, Form, Message, Header, Grid, Segment,
} from 'semantic-ui-react';
import { userValidationSchema } from '../../api/validation-schemas';

// const loginValidationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Invalid email address')
//     .required('Email is required!'),
//   password: Yup.string()
//     .min(9, 'Password must be 9 characters or longer')
//     .required('Password is required'),
// });

const LoginPage = props => (
  <Grid centered columns={1}>
    <Grid.Column className="centered-form">
      <Header textAlign="center" as="h3">
        Please Sign in
      </Header>
      <Segment>
        <Formik
          validationSchema={userValidationSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            const { history } = props;
            const { email, password } = values;
            Meteor.loginWithPassword(email, password, (err) => {
              if (err) {
                Bert.alert(err.reason, 'danger');
                return false;
              }
              Bert.alert('Logged in', 'success');
              setSubmitting(false);
              history.push('/');
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
              <Message
                hidden={!Object.keys(errors).length || !Object.keys(touched).length}
                color="red"
              >
                {Object.keys(errors).map(key => touched[key] && <p key={key}>{errors[key]}</p>)}
              </Message>
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
                <Button
                  fluid
                  color="black"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  type="submit"
                >
                  Sign in
                </Button>
              </Form>
            </Fragment>
          )}
        />
      </Segment>
      <p className="login-subtitle">
        Not a member?
        {' '}
        <Link color="black" to="/register">
          Sign up here
        </Link>
      </p>
      <p className="login-subtitle">
        Forgot password?
        {' '}
        <Link to="/forgot-password">Click here</Link>
      </p>
    </Grid.Column>
  </Grid>
);

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(LoginPage);
