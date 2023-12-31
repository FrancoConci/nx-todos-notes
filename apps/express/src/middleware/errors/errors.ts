import { ErrorResponse } from '@demo/rest-api-models';
import { NextFunction, Request, Response } from 'express';

export const serverError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('TODO do something with error', err);
  res.status(500);
  const response: ErrorResponse = {
    message: 'server error',
    code: 'server-error',
  };
  res.send(response);
};

export const fallback404 = (_: Request, res: Response) => {
  res.status(404);
  const response: ErrorResponse = {
    message: 'resource unavailable',
    code: 'resource-unavailable',
  };
  res.send(response);
};
