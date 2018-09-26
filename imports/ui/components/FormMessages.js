import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const FormMessages = ({ errors, touched }) => {
  const errorKeys = Object.keys(errors);
  const touchedKeys = Object.keys(touched);
  // Show form messages if there are errors in some touched input
  const show = errorKeys.some(element => touchedKeys.includes(element));
  return (
    <Message hidden={!show} color="red">
      {Object.keys(errors).map(key => touched[key] && <p key={key}>{errors[key]}</p>)}
    </Message>
  );
};

FormMessages.propTypes = {
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

export default FormMessages;
