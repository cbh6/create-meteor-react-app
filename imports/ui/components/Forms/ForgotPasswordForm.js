import React, { Fragment } from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'semantic-ui-react';
import FormMessages from '../FormMessages';
import { forgotPasswordValidationSchema } from '../../validation/user-schema';

const ForgotPasswordForm = () => (
  <Formik
    validationSchema={forgotPasswordValidationSchema}
    initialValues={{ email: '', password: '' }}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      const { email } = values;
      Accounts.forgotPassword({ email }, (err) => {
        if (err) {
          Bert.alert(`Error: ${err.reason}`, 'danger');
        }
        Bert.alert(`Request sent to ${email}.`, 'success');
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
          <Button fluid color="black" onClick={handleSubmit} disabled={isSubmitting} type="submit">
            Submit
          </Button>
        </Form>
      </Fragment>
    )}
  />
);

export default ForgotPasswordForm;
