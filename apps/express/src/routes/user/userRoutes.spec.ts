import request from 'supertest';
import { app } from '../../app';
import {
  defaultUser,
  defaultUserId,
  populateDb,
  teardownDb,
} from '../../database/testSetup/utils';
import jsonwebtoken from 'jsonwebtoken';

beforeAll(async () => await populateDb());
afterAll(async () => await teardownDb());

const secret = 'youllneverguess';

describe.each([
  {
    expected: defaultUser,
  },
])('/user/{id}', ({ expected }) => {
  test(`returns ${expected}`, async () => {
    const token = jsonwebtoken.sign({ id: defaultUserId }, secret, {
      expiresIn: 3600,
    });
    const response = await request(app)
      .get(`/user/${defaultUserId}`)
      .set('Authorization', token);
    expect(response.body).toEqual(expected);
  });
});
