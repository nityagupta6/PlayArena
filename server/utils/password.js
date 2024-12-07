import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export function getJwt(object, expiresIn = '30d') {
  const secret = process.env.SECRET;
  const options = {
    algorithm: 'HS256',
    expiresIn,
  };

  return jwt.sign(object, secret, options);
}

export function encryptString(str) {
  const encrypted = bcrypt.hashSync(str, process.env.SECRET);
  return encrypted;
}
