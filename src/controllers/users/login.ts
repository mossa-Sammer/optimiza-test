import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import util from 'util';

import { loginSchema } from './validation';

import {
  Login_Success,
  User_Not_Found,
  Incorrect_Password,
  Un_Authorized,
  Validation_Error,
} from '../../config/constants';
import { User } from '../../entity/User';
import validationFormater from '../../utils/validationFormater';

const signPromise = util.promisify(jwt.sign);

interface Body {
  email: string;
  password: string;
}

export default async (
  req: Request<{}, {}, Body>,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  try {
    await loginSchema.validate(req.body, { abortEarly: false });

    const storedUser = await User.findOne({ where: { email } });

    if (!storedUser) {
      return res.status(404).json({
        message: User_Not_Found,
        data: {
          errors: {
            email: User_Not_Found,
          },
        },
      });
    }
    const isAuthed = await bcrypt.compare(password, storedUser.password);
    if (!isAuthed)
      return res.status(401).json({
        message: Un_Authorized,
        data: {},
      });

    delete storedUser.password;

    const token = await signPromise(
      {
        id: storedUser.id,
        email: storedUser.email,
      },
      process.env.JWT_SECRET,
    );
    return res.json({
      message: Login_Success,
      data: {
        user: storedUser,
        token,
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
