import * as yup from 'yup';

// TODO, type the schema with the request body type

export const signupSchema = yup.object().shape({
  username: yup.string(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  phone: yup.string().required(),
  country: yup.string(),
  city: yup.string(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().min(8).required(),
});
