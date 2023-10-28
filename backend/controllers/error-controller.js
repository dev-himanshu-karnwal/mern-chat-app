const path = require("path");
const AppError = require(path.join(__dirname, "./../utils/app-error"));

const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong 😣",
  });
};

const handleJWTError = (err) => new AppError(`Invalid Token! Login Again`, 401);

const handleJWTExpiredError = (err) =>
  new AppError("Your login session has Expired. Login again", 401);

const handleCastErrorDB = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateFieldsErrorDB = (err) =>
  new AppError(
    `Duplicate field value ${
      err.errmsg.match(/"(.*?[^\\])"/)[0]
    }: Please use another one !`,
    400
  );

const handleValidationErrorDB = (err) =>
  new AppError(
    `Validation Error: ${Object.values(err.errors)
      .map((er) => er.message)
      .join(". ")}`,
    400
  );

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = err;
    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsErrorDB(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") error = handleJWTError(err);
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError(err);

    sendErrorProd(error, req, res);
  }
};

module.exports = globalErrorHandler;
