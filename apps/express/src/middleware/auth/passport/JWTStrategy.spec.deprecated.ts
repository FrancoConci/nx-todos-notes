// import jsonwebtoken from 'jsonwebtoken';
// import request from 'supertest';
// import { app } from '../../../app';
// import {
//   defaultUser,
//   defaultUserId,
//   populateDb,
//   teardownDb,
// } from '../../../database/testSetup/utils';

// beforeAll(async () => await populateDb());
// afterAll(async () => await teardownDb());

// const internalSecret = 'youllneverguess';

// describe.each([
//   {
//     id: defaultUserId,
//     secret: internalSecret,
//     expected: defaultUser,
//   },
// ])('jwt strategy - success', ({ expected, id }) => {
//   test(`given ${id} and ${internalSecret}, returns ${JSON.stringify(
//     expected
//   )}`, async () => {
//     const token = jsonwebtoken.sign({ id }, internalSecret);
//     const response = await request(app)
//       .get(`/user/${id}`)
//       .set('Authorization', `bearer ${token}`);
//     expect(response.body).toEqual(expected);
//   });
// });

// describe.each([
//   {
//     id: 'unknownid',
//     secret: internalSecret,
//     expected: {
//       code: 'server-error',
//       message: 'server error',
//     },
//   },
//   {
//     id: defaultUserId,
//     secret: 'unknownsecret',
//     expected: {},
//   },
// ])('jwt strategy - failure', ({ expected, id, secret }) => {
//   test(`given ${id} and ${secret}, returns ${JSON.stringify(
//     expected
//   )}`, async () => {
//     const token = jsonwebtoken.sign({ id }, secret);
//     const response = await request(app)
//       .get(`/user/${id}`)
//       .set('Authorization', `Bearer ${token}`);
//     expect(response.body).toEqual(expected);
//   });
// });
