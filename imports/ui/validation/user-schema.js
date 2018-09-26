import * as Yup from 'yup';

const USER_BASE_SHAPE = {
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be 6 characters or longer')
    .required('Password is required'),
};

const REGISTER_SHAPE = Object.assign(
  { username: Yup.string().required('Username is required') },
  USER_BASE_SHAPE,
);

export const loginValidationSchema = Yup.object().shape(USER_BASE_SHAPE);
export const registerValidationSchema = Yup.object().shape(REGISTER_SHAPE);

export const defaultValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});
