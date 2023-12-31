import { BaseError } from '@demo/shared-errors';
import { Request, Response } from 'express';
import { serverError } from './errors';

const next = () => {};
const req = {} as unknown as Request;
const res = { send: jest.fn, status: jest.fn } as unknown as Response;
const statusSpy = jest.spyOn(res, 'status');
const sendSpy = jest.spyOn(res, 'send');

beforeEach(() => jest.resetAllMocks());

describe.each([
  {
    error: new Error('unimportant'),
    expectedStatus: 404,
    expected: {
      message: 'resource unavailable',
      code: 'resource-unavailable',
    },
  },
  {
    error: new BaseError('unimportant'),
    expectedStatus: 500,
    expected: {
      message: 'server error',
      code: 'server-error',
    },
  },
])('serverError', ({ expected, expectedStatus, error }) => {
  test(`returns the right content`, () => {
    serverError(error, req, res, next);
    expect(statusSpy).toBeCalledWith(expectedStatus);
    expect(sendSpy).toBeCalledWith(expected);
  });
});
