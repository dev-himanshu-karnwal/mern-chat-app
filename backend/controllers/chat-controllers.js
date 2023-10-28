const path = require("path");
const User = require(path.join(__dirname, "./../models/user-model.js"));
const Chat = require(path.join(__dirname, "./../models/chat-model.js"));
const catchAsync = require(path.join(__dirname, "./../utils/catch-async"));
const AppError = require(path.join(__dirname, "./../utils/app-error"));

exports.getChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);
  if (!chat) {
    return next(new AppError("Chat not found", 404));
  }

  return res.status(200).json({
    status: "success",
    message: "Chat found",
    data: { chat },
  });
});
