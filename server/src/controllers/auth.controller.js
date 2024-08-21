import { ApiError } from '../utils/ApiError.js';
import { userModel } from '../models/User/User.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const userRegister = asyncHandler(async (req, res, next) => {
  let { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return next(
      new ApiError(
        400,
        'Invalid credentails: username password and email required'
      )
    );
  }

  let userExists = await userModel.findOne({ userName });
  if (userExists) {
    return next(new ApiError(409, 'User with username exists'));
  }

  let user = await userModel.create({ userName, email, password });

  return res
    .status(200)
    .json(
      new ApiResponse(200, userName, `User with ${user} created successfully`)
    );
});

export const userLogin = asyncHandler(async (req, res, next) => {
  let { userName, password } = req.body;

  if (!userName || !password) {
    return next(
      new ApiError(
        400,
        'Invalid credentails: username password and email required'
      )
    );
  }

  let userExists = await userModel.findOne({ userName });
  if (!userExists) {
    return next(new ApiError(400, "User with username doesn't exists"));
  }

  let verifyPasswrod = await userExists.comparePassword(password);
  if (!verifyPasswrod) {
    return next(new ApiError(401, 'User credential failed'));
  }
  const refreshToken = await userExists.createRefreshToken(
    userExists._id,
    userExists.userName
  );
  const accessToken = await userExists.createAccessToken(
    userExists._id,
    userExists.userName
  );
  userExists.refreshToken = refreshToken;
  userExists.save();
  res.cookie('jwt', refreshToken, {
    httpOnly: true, // Makes cookie inaccessible to JavaScript
    secure: false, // Set to true if using HTTPS
    maxAge: 3600000, // Cookie expiry time in milliseconds (1 hour)
  });
  return res
    .status(200)
    .json(new ApiResponse(200, accessToken, `User logged in successfully`));
});

export const userLogout = asyncHandler(async (req, res, next) => {
  let cookie = req.cookies;
  if (!cookie?.jwt) next(new ApiError(204, ''));

  const refreshToken = cookie?.jwt;

  let userExists = await userModel.findOne({ refreshToken });
  if (!userExists) {
    res.clearCookie('jwt', {
      httpOnly: true, // Makes cookie inaccessible to JavaScript
      secure: false, // Set to true if using HTTPS
      maxAge: 3600000, // Cookie expiry time in milliseconds (1 hour)
    });
    next(new ApiError(204, ''));
  }

  userExists.refreshToken = '';
  userExists.save();
  res.clearCookie('jwt', {
    httpOnly: true, // Makes cookie inaccessible to JavaScript
    secure: false, // Set to true if using HTTPS
    maxAge: 3600000, // Cookie expiry time in milliseconds (1 hour)
  });
  res.sendStatus(204);
});
