import { Router } from 'express';

export default (app: Router): Router => {
  app.get('/public/hello', async (req, res, next) => {
    try {
      res.json({ msg: 'ok' });
    } catch (e) {
      next(e);
    }
  });

  return app;
};
