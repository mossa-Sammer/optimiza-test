import { Request, Response, NextFunction } from 'express';
import { Validation_Error } from '../../config/constants';
import { Product } from '../../entity/Product';
import validationFormater from '../../utils/validationFormater';

interface Body {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  price: number;
}
import { addProductSchema } from './validation';

export default async (
  req: Request<{}, {}, Body>,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, imageUrl, category, price } = req.body;
  try {
    await addProductSchema.validate(req.body, { abortEarly: false });
    const product = new Product();
    product.title = title;
    product.description = description;
    product.category = category;
    product.imageUrl = imageUrl;
    product.price = price;

    const savedProduct = await Product.save(product);
    res.status(201).json({
      message: 'Product Created Successfully',
      data: {
        product: savedProduct,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.name === Validation_Error) {
      const errors = validationFormater(error);

      return res.status(400).json({
        message: Validation_Error,
        data: {
          errors,
        },
      });
    } else next(error);
  }
};
