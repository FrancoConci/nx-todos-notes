import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from '@demo/rest-api-models';
import {
  AuthError,
  UserCreateError,
  UserRetrieveError,
  fnOrUserCreateError,
  fnOrUserRetrieveError,
} from '@demo/shared-errors';
import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import {
  createUserAdapter,
  findUserViaLogin,
} from '../../database/adapters/user/userAdapters';

export const signToken = (id: string) => {
  return jsonwebtoken.sign({ id }, 'youllneverguess', {
    expiresIn: 3600,
  });
};

export const resWithAuth = <T>(res: Response, token: string, response: T) => {
  res.setHeader('Set-Cookie', `franco-demo-cookie=${token}; HttpOnly;`);
  res.send(response);
};

export const loginRequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password }: LoginRequest = req.body;
  const retrievedUser = await fnOrUserRetrieveError(() =>
    findUserViaLogin(username, password)
  );
  if (retrievedUser instanceof UserRetrieveError) {
    next(retrievedUser);
    return;
  }

  const { id } = retrievedUser;
  const token = signToken(id);
  const response: LoginResponse = { token };
  resWithAuth(res, token, response);
  return;
};

export const signupRequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password }: SignupRequest = req.body;
  if (!username || !password) {
    next(new AuthError('invalid request'));
    return;
  }
  const retrievedUser = await fnOrUserRetrieveError(() =>
    findUserViaLogin(username, password)
  );
  let id = null;
  if (!(retrievedUser instanceof UserRetrieveError)) {
    id = retrievedUser.id;
  } else {
    const newUser = { username, password };
    const user = await fnOrUserCreateError(
      async () => await createUserAdapter(newUser)
    );
    if (user instanceof UserCreateError) {
      next(user);
      return;
    }
    id = user.id;
  }
  const token = signToken(id);
  const response: SignupResponse = { token };
  resWithAuth(res, token, response);
  return;
};
