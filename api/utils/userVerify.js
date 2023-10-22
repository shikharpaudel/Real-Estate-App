import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const userVerify = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'You are Unauthorized to make this change!'));

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden Request'));

    req.user = user;
    next();
  });
};