import { Request, Response, NextFunction } from 'express';
import { Product } from '../../entity/Product';
export default async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.body.id);
  if (!id)
    return res.status(400).json({
      message: 'Provide the id in the body',
      data: {},
    });
  await Product.delete(id);
  res.status(204).json({
    message: 'Product Deleted',
    data: {
      id,
    },
  });
};
