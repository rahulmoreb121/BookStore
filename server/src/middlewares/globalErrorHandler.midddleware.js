const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: err.message,
    sucess: err.success,
    data: err.data,
  });
};
export { globalErrorHandler };
