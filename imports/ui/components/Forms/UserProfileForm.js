import React, { Component, Fragment } from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'semantic-ui-react';
import FormMessages from '../FormMessages';
import { profileValidationSchema } from '../../validation/user-schema';

class UserProfileForm extends Component {
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
    );
  }
}

export default UserProfileForm;
