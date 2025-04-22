import db from '$/db/index.js';
import { NextFunction, Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';

export default (app: Router): Router => {
  app.post(
    '/auth/signup',
    [
      body('email').isEmail(),
      body('name').isString(),
      body('pass').isStrongPassword(),
    ],
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;
        }

        const { email, pass: password, name } = req.body;

        if (!email || !password || !name) {
          res.status(400).json({
            error:
              'Missing required fields: email, password, and name are required',
          });
          return;
        }

        const { data, error } = await db.auth.signUp({
          email,
          password,
          options: {
            data: { name },
          },
        });

        if (error) {
          throw error;
        }

        res.send(data);
      } catch (e) {
        next(e);
      }
    },
  );

  app.post(
    '/auth/signin',
    [body('email').isEmail(), body('password').isStrongPassword()],
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;
        }

        const { email, password } = req.body;

        if (!email || !password) {
          res.status(400).json({
            error:
              'Missing required fields: email, password, and name are required',
          });
          return;
        }

        const { data, error } = await db.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          res.status(401).json({ error: 'Invalid email or password' });
          return;
        }

        // setCookie(c, "access_token", data?.session.access_token, {
        //   ...(data?.session.expires_at && { expires: new Date(data.session.expires_at) }),
        //   httpOnly: true,
        //   path: "/",
        //   secure: true,
        // });

        // setCookie(c, "refresh_token", data?.session.refresh_token, {
        //   ...(data?.session.expires_at && { expires: new Date(data.session.expires_at) }),
        //   httpOnly: true,
        //   path: "/",
        //   secure: true,
        // });

        res.set('access_token', data?.session.access_token);
        res.set('refresh_token', data?.session.refresh_token);

        res.send(data);
      } catch (e) {
        next(e);
      }
    },
  );

  app.get('/me', async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.cookies);
      const {
        data: { user },
      } = await db.auth.getUser();

      console.log(user, 'user');

      res.send(user);
    } catch (e) {
      next(e);
    }
  });

  return app;
};
