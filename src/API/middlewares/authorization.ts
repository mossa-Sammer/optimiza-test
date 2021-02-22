import jwt from 'jsonwebtoken';
import util from 'util';
import { User } from '../../entity/User';

import { Request, Response, NextFunction } from 'express';

import { Un_Authorized, User_Not_Found } from '../../config/constants';

const verifyPromise: any = util.promisify(jwt.verify);
const verfiyToken = (token: string) =>
  verifyPromise(token, process.env.JWT_SECRET);

export default async (req: Request, res: Response, next: NextFunction) => {
  // we may use cookies, but we don't have cookies on mobile
  console.log(req.headers['authorization']);
  const userJWT = req.headers['authorization']?.replace('Bearer ', '');
  try {
    const { id, email } = await verfiyToken(userJWT);

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: User_Not_Found, data: {} });
    }

    // add the user to the request object and forward to the next handler
    delete user.password;
    (req as any).user = user;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: Un_Authorized, data: {} });
  }
};
