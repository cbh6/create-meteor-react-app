/* eslint no-template-curly-in-string: "off" */
import * as Yup from 'yup';

// Custom validation
function equalTo(ref, msg) {
  return Yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path,
    },
    test(value) {
      return value === this.resolve(ref);
    },
  });
}
Yup.addMethod(Yup.string, 'equalTo', equalTo);

// User validation Fields
const email = Yup.string()
  .email('Invalid email address')
  .required('Email is required');
const password = Yup.string()
  .min(6, 'Password must be 6 characters or longer')
  .required('Password is required');
const username = Yup.string().required('Username is required');
const passwordConfirm = Yup.string()
  .equalTo(Yup.ref('password'), 'Passwords must match')
  .required('Confirm Password is Required');

export const loginValidationSchema = Yup.object().shape({ email, password });
export const registerValidationSchema = Yup.object().shape({ email, username, password });
export const profileValidationSchema = Yup.object().shape({ username });
export const resetPasswordValidationSchema = Yup.object().shape({ password, passwordConfirm });
export const forgotPasswordValidationSchema = Yup.object().shape({ email });
