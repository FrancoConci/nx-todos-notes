import jsonwebtoken from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../../../app';
import {
  defaultUser,
  defaultUserId,
  populateDb,
  teardownDb,
} from '../../../database/testSetup/utils';

beforeAll(async () => await populateDb());
afterAll(async () => await teardownDb());

const internalSecret = 'youllneverguess';

describe.each([
  {
    id: defaultUserId,
    secret: internalSecret,
    expected: defaultUser,
  },
])('cookie strategy - success', ({ expected, id }) => {
  test(`given ${id} and ${internalSecret}, returns ${JSON.stringify(
    expected
  )}`, async () => {
    const token = jsonwebtoken.sign({ id }, internalSecret);
    const response = await request(app)
      .get(`/user/${id}`)
      .set('Cookie', [`franco-demo-cookie=${token}`]);
    expect(response.body).toEqual(expected);
  });
});

describe.each([
  {
    id: 'unknownid',
    secret: internalSecret,
    expected: {
      code: 'server-error',
      message: 'server error',
    },
  },
  {
    id: defaultUserId,
    secret: 'unknownsecret',
    expected: {
      code: 'server-error',
      message: 'server error',
    },
  },
])('cookie strategy - failure', ({ expected, id, secret }) => {
  test(`given ${id} and ${secret}, returns ${JSON.stringify(
    expected
  )}`, async () => {
    const token = jsonwebtoken.sign({ id }, secret);
    const response = await request(app)
      .get(`/user/${id}`)
      .set('Cookie', [`franco-demo-cookie=${token}`]);
    expect(response.body).toEqual(expected);
  });
});
