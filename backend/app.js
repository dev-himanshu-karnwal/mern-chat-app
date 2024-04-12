const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { createServer } = require("http");
const socketIO = require("socket.io");

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
const { attachIO } = require(path.join(
  __dirname,
  "./controllers/socket-controller"
));
const AppError = require(path.join(__dirname, "./utils/app-error"));

const app = express();
const server = createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "HEAD"],
    credentials: true,
  },
});

const userSocketIdMapping = {};
app.use(attachIO(io, userSocketIdMapping));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/groups", groupRouter);
app.use("/api/v1/messages", messageRouter);

app.use("*", (req, res, next) =>
  next(new AppError(`${req.originalUrl} : Not found / Invalid URL`, 404))
);

app.use(globalErrorHandler);

module.exports = server;
