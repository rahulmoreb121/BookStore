import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { userModel } from '../models/User/User.models.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const generateRefreshToken = asyncHandler(async (req, res, next) => {
  let cookie = req.cookies?.jwt;

  if (!cookie) {
    return next(new ApiError(400, 'No jwt token cookie available'));
  }

  // verfiy refresh jwt // if invlaid exit
  jwt.verify(cookie, process.env.REFRESH_SECRET, async (err, decoded) => {
    if (err) return next(new ApiError(403, 'refresh Token is invalid'));
    // generate access and refresh token and set to database
    const foundUser = await userModel.findOne({ _id: decoded._id });

    if (!foundUser)
      return next(
        new ApiError(403, "Token is manipulated and couldn't find user ")
      );

    let accessToken = await foundUser.createAccessToken(
      decoded._id,
      foundUser.userName
    );

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          accessToken,
          `new access token created successfully`
        )
      );
  });
});

export { generateRefreshToken };
