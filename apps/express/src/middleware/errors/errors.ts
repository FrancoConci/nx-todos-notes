import { ErrorResponse } from '@demo/rest-api-models';
import { BaseError } from '@demo/shared-errors';
import { NextFunction, Request, Response } from 'express';

export const serverError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('TODO do something with error', err);
  let response: ErrorResponse;
  if (err instanceof BaseError) {
    res.status(500);
    response = {
      message: 'server error',
      code: 'server-error',
    };
  } else {
    res.status(404);
    response = {
      message: 'resource unavailable',
      code: 'resource-unavailable',
    };
  }

  res.send(response);
  return;
};
