import { Request, Response } from 'express';
import { fallback404, serverError } from './errors';

const error = new Error('unimportant');
const next = () => {};
const req = {} as unknown as Request;
const res = { send: jest.fn, status: jest.fn } as unknown as Response;
const statusSpy = jest.spyOn(res, 'status');
const sendSpy = jest.spyOn(res, 'send');

beforeEach(() => jest.resetAllMocks());

describe.each([
  {
    expectedStatus: 500,
    expected: {
      message: 'server error',
      code: 'server-error',
    },
  },
])('serverError', ({ expected, expectedStatus }) => {
  test(`returns the right content`, () => {
    serverError(error, req, res, next);
    expect(statusSpy).toBeCalledWith(expectedStatus);
    expect(sendSpy).toBeCalledWith(expected);
  });
});

describe.each([
  {
    expectedStatus: 404,
    expected: {
      message: 'resource unavailable',
      code: 'resource-unavailable',
    },
  },
])('serverError', ({ expected, expectedStatus }) => {
  test(`returns the right content`, () => {
    fallback404(req, res);
    expect(statusSpy).toBeCalledWith(expectedStatus);
    expect(sendSpy).toBeCalledWith(expected);
  });
});
