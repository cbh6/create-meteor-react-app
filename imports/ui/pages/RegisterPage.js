import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
  Button, Form, Header, Grid, Segment,
} from 'semantic-ui-react';
import FormMessages from '../components/FormMessages';
import { registerValidationSchema } from '../validation/user-schema';

class RegisterPage extends Component {
  login = (email, password) => {
    const { history } = this.props;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        Bert.alert(err.reason, 'danger');
        return false;
      }
      Bert.alert('Logged in', 'success');
      history.push('/');
    });
  };

  render() {
    return (
      <Grid centered columns={1}>
        <Grid.Column className="centered-form">
          <Header textAlign="center" as="h3">
            Please Sign up
          </Header>
          <Segment>
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
                  this.login(email, password);
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
