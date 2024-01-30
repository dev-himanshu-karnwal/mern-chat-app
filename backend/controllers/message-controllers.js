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
    if (!group) {
      return next(
        new AppError("Group ID is required to send a group message", 400)
      );
    }

    try {
      groupMessaged = await Group.findById(group);
      msgObj.group = group;
    } catch (err) {
      return next(new AppError(`Invalid Group ID "${group}"`, 400));
    }
  } else {
    if (!reciever) {
      return next(
        new AppError("Reciever ID is required to send a message", 400)
      );
    }

    if (req.user._id.toString() === reciever) {
      return next(new AppError("You cannot send a message to yourself", 400));
    }

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

  const { io, userSocketIdMapping } = req;
  if (userSocketIdMapping[reciever]) {
    io.to(userSocketIdMapping[reciever]).emit("receive-message", message);
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
    msg = await Message.findById(req.params.id);
    console.log(msg);
    if (!msg) throw new Error();

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

  await Message.findOneAndDelete(msg);

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

exports.deleteMessage = catchAsync(async (req, res, next) => {
  let message;
  try {
    message = await Message.findById(req.params.id);
    if (!message) throw new Error();
  } catch (err) {
    return next(new AppError(`Invalid Message ID "${req.params.id}"`, 400));
  }

  const participantsEmail = [];

  message = await message.populate({
    path: "sender reciever",
    select: "name email",
  });

  if (message.isGroupMessage) {
    message = await message.populate({
      path: "group",
      select: "members admin",
      populate: {
        path: "members admin",
        select: "name email",
      },
    });

    participantsEmail.push(
      message.group.admin.email,
      ...[...message.group.members].map((member) => member.email)
    );
  } else {
    participantsEmail.push(message.sender.email, message.reciever.email);
  }

  if (!participantsEmail.includes(req.user.email)) {
    return next(
      new AppError(
        "You are not a participant of this messsage, so can't delete it",
        401
      )
    );
  }

  if (message.deletedFor.includes(req.user._id)) {
    return next(new AppError("You have already deleted this message", 400));
  }

  message.deletedFor.push(req.user._id);
  await message.save();

  if (message.isGroupMessage) {
    if (message.deletedFor.length === message.group.members.length + 1) {
      await Message.deleteOne(message);
    }
  } else {
    if (message.deletedFor.length === 2) {
      await Message.deleteOne(message);
    }
  }

  res.status(202).json({
    status: "success",
    message: "Message successfully deleted for your account",
    data: null,
  });
});

exports.getChatMessages = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  if (userId === req.user._id.toString()) {
    return next(new AppError("No one has sent messages to self", 400));
  }

  let messages = await Message.find({
    $or: [
      { reciever: userId, sender: req.user._id },
      { sender: userId, reciever: req.user._id },
    ],
  })
    .select("-isGroupMessage -deletedFor -updatedAt -__v")
    .sort("-createdAt");

  messages = messages.map((msg) => {
    return {
      _id: msg._id,
      content: msg.content,
      sender: msg.sender.toString() === userId ? "user" : "you",
      time: msg.createdAt,
    };
  });

  res.json({
    status: "success",
    message: "Chat Messages",
    result: messages.length,
    messages,
  });
});

exports.getGroupMessages = catchAsync(async (req, res, next) => {
  const groupId = req.params.id;

  const group = await Group.findById(groupId);
  if (!group) {
    return next(new AppError("Invalid group ID", 401));
  }

  if (
    !group.members.find((member) => member === req.user._id.toString()) &&
    !group.admin === req.user._id.toString()
  ) {
    return next(
      new AppError(
        "Only a Group admin or member has access to group information",
        401
      )
    );
  }

  let messages = await Message.find({ group: groupId })
    .select("-isGroupMessage -deletedFor -updatedAt -__v")
    .populate({ path: "sender", select: "name pic _id" })
    .sort("-createdAt");

  messages = messages.map((msg) => {
    return {
      _id: msg._id,
      content: msg.content,
      sender: msg.sender,
      time: msg.createdAt,
    };
  });

  res.json({
    status: "success",
    message: "Group Messages",
    result: messages.length,
    messages,
  });
});
