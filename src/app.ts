import morgan from 'morgan';
import express, { Request } from 'express';

import logger from './logger.js';
import publicApi from '../src/routes/public/index.js';

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

const publicRouter = publicApi(express.Router());
publicRouter.use(generalMiddlewares);

app.set('trust proxy', true);
app.use(publicRouter);

app.use(generalMiddlewares);
app.use(APP_PREFIX, publicRouter);

export default app;
