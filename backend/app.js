const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const userRouter = require(path.join(__dirname, "./routes/user-routes.js"));
const groupRouter = require(path.join(__dirname, "./routes/group-routes.js"));
const chatRouter = require(path.join(__dirname, "./routes/chat-routes.js"));
const messageRouter = require(path.join(
  __dirname,
  "./routes/message-routes.js"
));
const globalErrorHandler = require(path.join(
  __dirname,
  "./controllers/error-controller"
));
const AppError = require(path.join(__dirname, "./utils/app-error"));

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/groups", groupRouter);
app.use("/api/v1/messages", messageRouter);

app.use("*", (req, res, next) =>
  next(new AppError(`${req.originalUrl} : Not found / Invalid URL`, 404))
);

app.use(globalErrorHandler);

module.exports = app;
