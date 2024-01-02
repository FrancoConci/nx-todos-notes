import jsonwebtoken from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../../app';
import {
  defaultUser,
  defaultUserId,
  populateDb,
  teardownDb,
} from '../../database/testSetup/utils';

beforeAll(async () => await populateDb());
afterAll(async () => await teardownDb());

const secret = 'youllneverguess';

describe.each([
  {
    expected: defaultUser,
  },
])('/user/{id}', ({ expected }) => {
  test(`returns ${expected}`, async () => {
    const token = jsonwebtoken.sign({ id: defaultUserId }, secret);
    const response = await request(app)
      .get(`/user/${defaultUserId}`)
      .set('Cookie', [`franco-demo-cookie=${token}`]);
    expect(response.body).toEqual(expected);
  });
});
