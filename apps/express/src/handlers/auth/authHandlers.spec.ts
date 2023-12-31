import { Request, Response } from 'express';
import { loginRequestHandler } from './authHandlers';

const req = jest.fn as unknown as Request;
const res = { send: jest.fn } as unknown as Response;
const sendSpy = jest.spyOn(res, 'send');

afterEach(() => {
  jest.restoreAllMocks();
});

describe.each([
  {
    expected: {
      token: '123asd',
    },
  },
])('loginRequestHandler', ({ expected }) => {
  test(`returns ${expected}`, () => {
    loginRequestHandler(req, res);
    expect(sendSpy).toBeCalledWith(expected);
  });
});
