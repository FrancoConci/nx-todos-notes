import request from 'supertest';
import { app } from '../../app';
import {
  defaultUser,
  populateDb,
  teardownDb,
} from '../../database/testSetup/utils';

beforeEach(() => populateDb());
afterEach(() => teardownDb());

describe.each([
  {
    payload: {
      username: defaultUser.username,
      password: defaultUser.password,
    },
  },
])('/login', ({ payload }) => {
  test(`returns a token`, async () => {
    const response = await request(app)
      .post('/auth/login/')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(response.body).toBeDefined();
    const { token } = response.body;
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });
});
