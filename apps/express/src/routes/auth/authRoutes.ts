import cors from 'cors';
import express from 'express';
import {
  loginRequestHandler,
  signupRequestHandler,
} from '../../handlers/auth/authHandlers';
import { corsOptions } from '../../middleware/cors/corsMiddleWare';

const authRouter = express.Router();

authRouter.post('/login', cors(corsOptions), loginRequestHandler);
authRouter.post('/signup', cors(corsOptions), signupRequestHandler);

export { authRouter };
