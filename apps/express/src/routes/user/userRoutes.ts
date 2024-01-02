import cors from 'cors';
import express from 'express';
import passport from 'passport';
import { userGetRequestHandler } from '../../handlers/user/userHandlers';
import { strategy } from '../../middleware/auth/passport/CookieStrategy';
import { corsOptions } from '../../middleware/cors/corsMiddleWare';

const userRouter = express.Router();

passport.authenticate('cookie', { session: false });
passport.use(strategy);

userRouter.get(
  '/:id',
  cors(corsOptions),
  passport.authenticate('cookie', { session: false }),
  userGetRequestHandler
);

export { userRouter };
