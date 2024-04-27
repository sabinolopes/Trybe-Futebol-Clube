import { Request } from 'express';
import * as bcrypt from 'bcryptjs';
import { ServiceResponses } from '../types/Responses';
import { IUsers } from '../Interfaces/IUsers';
import { verifyToken } from '../utils/jwt';

const validatePassword = (password: string, dbPassword: string) => bcrypt
  .compareSync(password, dbPassword);

const validateToken = (req: Request) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return { status: 'UNAUTHORIZED', data: { message: 'Token not found' } };
  }

  const token = authorization.split(' ')[1];

  try {
    const tokenInfo = verifyToken(token);

    if (tokenInfo) {
      return true;
    }
  } catch (error) {
    console.log(error);

    return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
  }
};

const validateUser = (req: Request): ServiceResponses<IUsers> | null => {
  const { email, password } = req.body;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    return { status: 'BAD_REQUEST', data: { message: 'All fields must be filled' } };
  }
  const validMail = regex.test(email);
  if (!validMail || password.length < 7) {
    return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
  }
  return null;
};

export { validatePassword, validateToken, validateUser };
