import cors from 'cors';
import express from 'express';
import { connect } from './database/utils/utils';
import { corsOptions } from './middleware/cors/corsMiddleWare';
import { serverError } from './middleware/errors/errors';
import { authRouter } from './routes/auth/authRoutes';
import { userRouter } from './routes/user/userRoutes';
import cookieParser from 'cookie-parser';

export const app = express();

connect();

//! define list of addresses that can request stuff to the server
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send({ message: `Hello API` });
});

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use(serverError);
