import request from 'supertest';
import { app } from '../../app';

describe.each([
  {
    expected: {
      token: '123asd',
    },
  },
])('/login', ({ expected }) => {
  test(`returns ${expected}`, async () => {
    const response = await request(app).post('/auth/login/');
    expect(response.body).toEqual(expected);
  });
});
