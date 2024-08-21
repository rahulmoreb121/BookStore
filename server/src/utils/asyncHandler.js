import { ApiError } from './ApiError.js';

const asyncHandler = (fun) => async (req, res, next) => {
  try {
    await fun(req, res, next);
  } catch (err) {
    console.log('+++++++++++++++++++++++++', err);

    next(new ApiError(err.statusCode || 500, err.message));
  }

  // fun(req, res, next).catch((err) =>
  //   next(new ApiError(err.statusCode || 500, err.message))
  // );
};
export { asyncHandler };
