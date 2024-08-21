import { userModel } from '../models/User/User.models.js';
import { ApiError } from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';
const verifyAccessToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return next(new ApiError(401, 'No token available'));

  if (!authHeader.includes('Bearer'))
    return next(new ApiError(401, 'No Bearer Token'));

  const [_, token] = authHeader.split(' ');

  try {
    jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
      if (err) {
        return next(new ApiError(403, 'Invalid Token')); // 403 Forbidden if the token is invalid
      }
      console.log('Hello', decoded);
      req.user = decoded._id; // Attach the decoded payload to the request object
      next();
    });
  } catch (error) {
    return next(new ApiError(403, error));
  }
};

export { verifyAccessToken };
