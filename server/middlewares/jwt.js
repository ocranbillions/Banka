import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default {
  isLoggedIn(req, res, next) {
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
      return next();
    } catch (error) {
      return res.status(401).json({
        status: 401,
        errorMessage: 'Auth failed!',
      });
    }
  },

  denyClient(req, res, next) {
    if (req.userData.type === 'client') {
      return res.status(403).json({
        status: 403,
        errorMessage: 'Clients can\'t access this route',
      });
    }
    return next();
  },

  isAdmin(req, res, next) {
    if (req.userData.isadmin === false) {
      return res.status(403).json({
        status: 403,
        errorMessage: 'You are not an admin',
      });
    }
    return next();
  },

  isCashier(req, res, next) {
    if (req.userData.type !== 'staff') {
      return res.status(403).json({
        status: 403,
        errorMessage: 'The requested page can only be accessed by a staff',
      });
    }
    return next();
  },
};
