import { AuthError, fnOrAuthError } from '@demo/shared-errors';
import passport from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { findUserById } from '../../../database/adapters/user/userAdapters';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'youllneverguess',
  // issuer: 'accounts.examplesoft.com',
  // audience: 'yoursite.net',
};

export const strategy = new Strategy(opts, async function (
  jwt_payload: { id: string },
  done: VerifiedCallback
) {
  const { id } = jwt_payload;
  try {
    const query = async () => findUserById(id);
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
