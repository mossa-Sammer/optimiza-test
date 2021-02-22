import * as yup from 'yup';

export const addProductSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  imageUrl: yup.string().required(),
  category: yup.string().required(),
  price: yup.number().required(),
});
