import { Router } from 'express';

export default (app: Router): Router => {
  app.get('/public/ready', async (req, res, next) => {
    try {
      res.json({ msg: 'ok' });
    } catch (e) {
      next(e);
    }
  });

  return app;
};
