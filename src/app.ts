import morgan from 'morgan';
import express, { Request } from 'express';

import logger from './logger.js';
import publicApi from '../src/routes/public/index.js';
import auth from './api/auth/index.js';
import { authMiddleware } from './middlewares/auth.middleware.js';

import { cookieParser } from 'cookie-parser';

const APP_PREFIX = '/core';

morgan.token('ip', (req: Request) => {
  return req.ip;
});

const morganMiddleware = morgan(
  `:ip :method :url :status :res[content-length] - :response-time ms`,
  {
    stream: {
      write: (message: string) => logger.http(message.trim()),
    },
  },
);

// TODO: Add session verifier (decode jwt)
const generalMiddlewares = [express.json()];

const withSessionVerify = [...generalMiddlewares];

const app = express();
app.use(morganMiddleware);
app.use(generalMiddlewares);
app.use(authMiddleware);
app.use(cookieParser());

app.use(express.json());
app.set('trust proxy', true);

const publicRouter = publicApi(express.Router());
const authRouter = auth(express.Router());

publicRouter.use(generalMiddlewares);
authRouter.use(generalMiddlewares);

app.use(publicRouter);
app.use(authRouter);

app.use(APP_PREFIX, publicRouter);

export default app;
