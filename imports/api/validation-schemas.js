import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be 6 characters or longer')
    .required('Password is required'),
});

export const defaultValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});
