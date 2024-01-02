import {
  LoginRequest,
  LoginResponse,
  SignupResponse,
} from '@demo/rest-api-models';
import {
  AuthError,
  UserRetrieveError,
  fnOrAuthError,
} from '@demo/shared-errors';
import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { findUserViaLogin } from '../../database/adapters/user/userAdapters';

export const loginRequestHandler = async (req: Request, res: Response) => {
  const { username, password }: LoginRequest = req.body;
  const retrievedUser = await fnOrAuthError(() =>
    findUserViaLogin(username, password)
  );
  if (
    retrievedUser instanceof UserRetrieveError ||
    retrievedUser instanceof AuthError
  )
    throw retrievedUser;
  const { id } = retrievedUser;
  const token = jsonwebtoken.sign({ id }, 'youllneverguess', {
    expiresIn: 3600,
  });
  const response: LoginResponse = { token };
  res.setHeader('Set-Cookie', `franco-demo-cookie=${token}; HttpOnly;`);
  res.send(response);
};

export const signupRequestHandler = (req: Request, res: Response) => {
  const response: SignupResponse = {
    token: '123asd',
  };
  res.send(response);
};
