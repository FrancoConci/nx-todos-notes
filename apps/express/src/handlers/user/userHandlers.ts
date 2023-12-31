import { User } from '@demo/rest-api-models';
import { NextFunction, Request, Response } from 'express';
import { getUserByIdAdapter } from '../../database/adapters/user/userAdapters';

export const userGetRequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const user = await getUserByIdAdapter(id).catch((err) => next(err));
  if (!user) next();
  else {
    const response: User = user;
    res.send(response);
  }
};
