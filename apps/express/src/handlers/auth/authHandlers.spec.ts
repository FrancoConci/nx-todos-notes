import { UserRetrieveError } from '@demo/shared-errors';
import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { TUnsavedUser } from '../../database/adapters/user/types';
import { User } from '../../database/mongoose/models/user';
import { defaultUser, defaultUserId } from '../../database/testSetup/utils';
import { signupRequestHandler } from './authHandlers';
import * as userAdapter from '../../database/adapters/user/userAdapters';

let findUserViaLoginDefault: User | UserRetrieveError = defaultUser;
let createUserAdapterDefault = defaultUser;

const res = { setHeader: jest.fn(), send: jest.fn() } as unknown as Response;
const next = jest.fn() as unknown as NextFunction;
jest.mock('../../database/adapters/user/userAdapters', () => ({
  findUserViaLogin: (username: string, password: string) =>
    findUserViaLoginDefault,
  createUserAdapter: () => createUserAdapterDefault,
}));

describe('signupRequestHandler', () => {
  beforeEach(async () => {});
  afterEach(async () => {
    findUserViaLoginDefault = defaultUser;
    createUserAdapterDefault = defaultUser;
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('calls res with token if user exists', async () => {
    findUserViaLoginDefault = defaultUser;
    createUserAdapterDefault = defaultUser;

    const request = {
      body: { username: defaultUser.username, password: defaultUser.password },
    } as unknown as Request;

    await signupRequestHandler(request, res, next);
    const spy = jest.spyOn(res, 'send');
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.setHeader).toHaveBeenCalledTimes(1);
    const { token } = spy.mock.calls[0][0];
    const decoded = jsonwebtoken.verify(token, 'youllneverguess');
    expect(decoded.id).toBe(defaultUserId);
    expect(res.setHeader).toHaveBeenCalledWith(
      'Set-Cookie',
      `franco-demo-cookie=${token}; HttpOnly;`
    );
  });

  it('creates a new user and calls res with token if user does not exist', async () => {
    findUserViaLoginDefault = new UserRetrieveError('not found by test design');
    createUserAdapterDefault = { ...defaultUser, id: 'someOtherId' };

    const request = {
      body: { username: defaultUser.username, password: defaultUser.password },
    } as unknown as Request;

    await signupRequestHandler(request, res, next);
    const spy = jest.spyOn(res, 'send');
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.setHeader).toHaveBeenCalledTimes(1);
    const { token } = spy.mock.calls[0][0];
    const decoded = jsonwebtoken.verify(token, 'youllneverguess');
    expect(decoded.id).toBe(createUserAdapterDefault.id);
    expect(res.setHeader).toHaveBeenCalledWith(
      'Set-Cookie',
      `franco-demo-cookie=${token}; HttpOnly;`
    );
  });

  it('calls next with auth error if request is malformed', async () => {
    const request = {
      body: {},
    } as unknown as Request;

    await signupRequestHandler(request, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledTimes(0);
  });
});
