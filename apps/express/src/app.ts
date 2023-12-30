import cors from 'cors';
import express from 'express';
import { corsOptions } from './middleware/cors/corsMiddleWare';
import { connect } from './database/utils/utils';

export const app = express();

connect();

//! define list of addresses that can request stuff to the server
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send({ message: `Hello API` });
});
