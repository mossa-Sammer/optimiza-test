import { Request, Response, NextFunction } from 'express';
import { Product } from '../../entity/Product';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    console.log(products);
    return res.json({ message: 'Success', data: { products } });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
