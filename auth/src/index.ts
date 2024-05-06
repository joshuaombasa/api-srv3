import express from 'express';
require('express-async-errors');
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';

import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';

const PORT = 3000;
const app = express();

app.set('trust proxy', true);

app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(signupRouter);

app.use(signinRouter);

app.use(signoutRouter);

app.use(currentUserRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = () => {
  mongoose
    .connect(
      'mongodb://127.0.0.1:27017/tiketi3-auth?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1'
    )
    .then(() => console.log('connected to mongodb'))
    .catch((error) => console.log(error));

  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
};

start();
