const path = require("path");
const User = require(path.join(__dirname, "./../models/user-model.js"));
const Chat = require(path.join(__dirname, "./../models/chat-model.js"));
const Group = require(path.join(__dirname, "./../models/group-model.js"));
const Message = require(path.join(__dirname, "./../models/message-model.js"));
const catchAsync = require(path.join(__dirname, "./../utils/catch-async"));
const AppError = require(path.join(__dirname, "./../utils/app-error"));

exports.createMessage = catchAsync(async (req, res, next) => {
  const { content, isGroupMessage, reciever, group } = req.body;
  const sender = req.user._id;

  const msgObj = { content, isGroupMessage, sender };
  msgObj.deletedFor = [];

  let groupMessaged;

  if (isGroupMessage) {
    try {
      groupMessaged = await Group.findById(group);
      msgObj.group = group;
    } catch (err) {
      return next(new AppError(`Invalid Group ID "${group}"`, 400));
    }
  } else {
    try {
      await User.findById(reciever);
      msgObj.reciever = reciever;
    } catch (err) {
      return next(new AppError(`Invalid Reciever ID "${reciever}"`, 400));
    }
  }

  let message = await Message.create(msgObj);
  if (!message) {
    return next(new AppError("Failed to create message", 500));
  }

  message = await Message.findById(message._id)
    .populate({
      path: "sender",
      select: "name email pic",
    })
    .populate({
      path: "group",
      select: "name pic",
    })
    .populate({
      path: "reciever",
      select: "name email pic",
    });

  if (isGroupMessage) {
    groupMessaged.latestMessage = message;
    groupMessaged.save();
  } else {
    const chat = await Chat.findOne({
      users: { $all: [req.user._id, reciever] },
    });

    if (chat) {
      chat.latestMessage = message;
      chat.save();
    } else {
      await Chat.create({
        users: [sender, reciever],
        latestMessage: message._id,
      });
    }
  }

  res.status(201).json({
    status: "success",
    message: "Message successfully created",
    data: { message },
  });
});

exports.completelyDeleteMessage = catchAsync(async (req, res, next) => {
  let msg;
  try {
    msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg.sender.equals(req.user._id))
      return next(
        new AppError(
          "Only sender of Message can completely delete a message",
          401
        )
      );
  } catch (err) {
    return next(new AppError(`Invalid Message ID "${req.params.id}"`, 400));
  }

  if (msg.isGroupMessage) {
    const group = await Group.findById(msg.group);

    const messages = await Message.find({ group: group._id })
      .sort({
        createdAt: -1,
      })
      .limit(1);

    group.latestMessage = messages[0]._id;
    group.save();
  } else {
    const messages = await Message.find({
      reciever: msg.reciever,
      sender: msg.sender,
    })
      .sort({
        createdAt: -1,
      })
      .limit(1);

    const latestMessage = messages.length ? messages[0]._id : undefined;
    await Chat.findOneAndUpdate(
      {
        users: { $all: [req.user._id, msg.reciever] },
      },
      { latestMessage }
    );
  }

  res.status(204).json({
    status: "success",
    message: "Message successfully deleted",
    data: null,
  });
});

exports.deleteMessage = catchAsync(async (req, res, next) => {});
