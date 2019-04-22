import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default {
  isLoggedIn: (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(403).json({
        status: 403,
        errorMessage: 'You must be logged in to access this route',
      });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 401,
        errorMessage: 'Invalid token',
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userData = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        status: 401,
        errorMessage: 'Auth failed!',
      });
    }
  },

  // isAdmin: (req, res, next) => {
  //   if (!req.headers.authorization) {
  //     return res.status(403).json({
  //       status: 403,
  //       error: 'You are not logged in!',
  //     });
  //   }

  //   const token = req.headers.authorization.split(' ')[1];
  //   if (!token) {
  //     return res.status(401).json({
  //       status: 401,
  //       error: 'Please provide a valid token',
  //     });
  //   }
  //   const decoded = jwt.verify(token, process.env.SECRET);
  //   const isadmin = decoded.isAdmin;
  //   if (isadmin === 'true') {
  //     return next();
  //   }
  //   return res.status(401).json({
  //     status: 401,
  //     error: 'Unauthorized access',
  //   });
  // },
};
