import { Router } from 'express';
import healthApi from './health.js';

export default (app: Router): Router => {
  healthApi(app);

  return app;
};
