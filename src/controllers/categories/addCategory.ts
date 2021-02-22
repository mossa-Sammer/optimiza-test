import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;
  // if (!title)
  //   return res.status(400).json({
  //     message: 'bad request',
  //     data: {},
  //   });
  // try {
  //   const category = await Category.create({
  //     title,
  //   });
  //   res.status(201).json({
  //     message: 'Category added successfully',
  //     data: {
  //       category,
  //     },
  //   });
  // } catch (e) {
  //   next(e);
  // }
};
