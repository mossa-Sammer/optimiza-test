import util from 'util'; // promisify callback based functions, node core module
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';

import { signupSchema } from './validation';
import { User } from '../../entity/User';

import validationFormater from '../../utils/validationFormater';

import {
  Validation_Error,
  Dublicate,
  Email_Already_Exists,
  Username_ALready_Exists,
} from '../../config/constants';

const signPromise = util.promisify(jwt.sign);

interface Body {
  email: string;
  username: string;
  password: string;
  phone: string;
  country: string;
  city: string;
}

export default async (
  req: Request<{}, {}, Body>,
  res: Response,
  next: NextFunction,
) => {
  const { email, username, password, phone, country, city } = req.body;

  // validation
  try {
    await signupSchema.validate(req.body, { abortEarly: false });
    const userExsits = await User.findOne({ where: [{ email }, { username }] });

    if (userExsits) {
      const errors = {
        email: '',
        username: '',
      };
      if (userExsits.email === email) errors.email = Email_Already_Exists;
      if (userExsits.username === username)
        errors.username = Username_ALready_Exists;
      return res.status(409).json({
        message: Dublicate,
        data: {
          errors,
        },
      });
    }

    const user = new User();
    const hashedPassword = await bcrypt.hash(password, 10);

    user.username = username;
    user.email = email;
    user.phone = phone;
    user.city = city;
    user.country = country;
    user.password = hashedPassword;

    const savedUser = await User.save(user);
    delete savedUser.password;

    // generate JWT token
    const token = await signPromise(
      { id: savedUser.id, email: savedUser.email },
      process.env.JWT_SECRET,
    );

    res.json({
      user: savedUser,
      token,
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
