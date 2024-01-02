import { AuthError, fnOrAuthError } from '@demo/shared-errors';
import jsonwebtoken from 'jsonwebtoken';
import passport, { VerifiedCallback } from 'passport';
import { Strategy } from 'passport-cookie';
import { findUserById } from '../../../database/adapters/user/userAdapters';

const opts = {
  cookieName: 'franco-demo-cookie',
};

export const strategy = new Strategy(opts, async function (
  token: { id: string },
  done: VerifiedCallback
) {
  const decoded = fnOrAuthError(() =>
    jsonwebtoken.verify(token, 'youllneverguess')
  );
  if (decoded instanceof AuthError) return done(decoded, false);
  try {
    const query = async () => findUserById(decoded.id);
    const user = await fnOrAuthError(query);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(new AuthError('Error while trying to retrieve user'), false);
  }
});

passport.use(strategy);
