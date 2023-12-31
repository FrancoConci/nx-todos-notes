import { NextFunction, Request, Response } from 'express';
import { userGetRequestHandler } from './userHandlers';
import {
  defaultUser,
  defaultUserId,
  setupDb,
  teardownDb,
} from '../../database/testSetup/utils';
import { UserRetrieveError } from '@demo/shared-errors';

const functions = { next: (arg: any) => arg };
const res = { send: jest.fn } as unknown as Response;
const sendSpy = jest.spyOn(res, 'send');
const nextSpy = jest.spyOn(functions, 'next') as unknown as NextFunction;

beforeAll(async () => await setupDb());
afterAll(async () => await teardownDb());

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe.each([
  {
    id: defaultUserId,
    expected: defaultUser,
  },
])('userGetRequestHandler($id)', ({ id, expected }) => {
  test(`returns ${expected}`, async () => {
    const req = { params: { id } } as unknown as Request;
    await userGetRequestHandler(req, res, nextSpy);
    expect(sendSpy).toBeCalledTimes(1);
    expect(sendSpy).toBeCalledWith(expected);
  });
});

describe.each([
  {
    id: 'unknownUserId',
  },
])('userGetRequestHandler($id)', ({ id }) => {
  test(`throws an error`, async () => {
    const req = { params: { id } } as unknown as Request;
    await userGetRequestHandler(req, res, nextSpy);
    expect(sendSpy).not.toBeCalled();
    expect(nextSpy).toBeCalledTimes(1);
    expect(nextSpy).toBeCalledWith(
      new UserRetrieveError('no user with this id')
    );
  });
});
