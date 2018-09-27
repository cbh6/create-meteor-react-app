import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Form } from 'semantic-ui-react';
import FormMessages from '../FormMessages';
import { resetPasswordValidationSchema } from '../../validation/user-schema';

const ChangePasswordForm = (props) => {
  const { submitMethod } = props;
  return (
    <Formik
      validationSchema={resetPasswordValidationSchema}
      initialValues={{ password: '', passwordConfirm: '' }}
      onSubmit={submitMethod}
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
  );
};

ChangePasswordForm.propTypes = {
  submitMethod: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
