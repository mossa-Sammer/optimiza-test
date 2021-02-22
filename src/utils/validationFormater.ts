import { ValidationError } from 'yup';

export default (yupError: ValidationError) => {
  const errors: any = {};
  yupError.inner.forEach((e) => {
    if (e.path) errors[e.path] = e.message;
  });
  return errors;
};
