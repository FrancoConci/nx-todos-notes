import cors from 'cors';
import express from 'express';
import { userGetRequestHandler } from '../../handlers/user/userHandlers';
import { corsOptions } from '../../middleware/cors/corsMiddleWare';
import passport from 'passport';
import { strategy } from '../../middleware/auth/passport/JWTstrategy';

const userRouter = express.Router();

passport.authenticate('jwt', { session: false });
passport.use(strategy);

userRouter.get(
  '/:id',
  cors(corsOptions),
  passport.authenticate('jwt', { session: false }),
  userGetRequestHandler
);

export { userRouter };
