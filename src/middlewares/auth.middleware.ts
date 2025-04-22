import db from '$/db/index.js';

export const authMiddleware = async (req, res, next) => {
  try {
    // const refresh_token = req.cookies.refresh_token;
    // const access_token = req.cookies.access_token;

    // const { data, error } = await db.auth.getUser(access_token);

    // if (data.user) {
    //   req.user = {
    //     id: data.user.id,
    //     email: data.user.email,
    //     created_at: data.user.created_at,
    //     updated_at: data.user.updated_at,
    //   };
    //   return next();
    // }

    // if (error) {
    //   console.error('Error while getting user by access_token:', error);
    //   if (!refresh_token) {
    //     return res.status(403).json({ message: 'No refresh token' });
    //   }

    //   const { data: refreshed, error: refreshError } =
    //     await db.auth.refreshSession({
    //       refresh_token,
    //     });

    //   if (refreshError) {
    //     console.error('Error while refreshing token:', refreshError);
    //     return res
    //       .status(403)
    //       .json({ message: 'Error while refreshing token' });
    //   }

    //   if (refreshed.user) {
    //     req.user = {
    //       id: refreshed.user.id,
    //       email: refreshed.user.email,
    //       created_at: refreshed.user.created_at,
    //       updated_at: refreshed.user.updated_at,
    //     };
    //   }

    return next();
    // }
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
