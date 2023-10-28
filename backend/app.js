const path = require("path");
const express = require("express");
const morgan = require("morgan");

const userRouter = require(path.join(__dirname, "./routes/user-routes.js"));
const groupRouter = require(path.join(__dirname, "./routes/group-routes.js"));
const globalErrorHandler = require(path.join(
  __dirname,
  "./controllers/error-controller"
));
const AppError = require(path.join(__dirname, "./utils/app-error"));

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/groups", groupRouter);

app.use("*", (req, res, next) =>
  next(new AppError(`${req.originalUrl} : Not found / Invalid URL`, 404))
);

app.use(globalErrorHandler);

module.exports = app;
