const path = require("path");
const User = require(path.join(__dirname, "./../models/user-model.js"));
const Group = require(path.join(__dirname, "./../models/group-model.js"));
const Message = require(path.join(__dirname, "./../models/message-model.js"));
const catchAsync = require(path.join(__dirname, "./../utils/catch-async"));
const AppError = require(path.join(__dirname, "./../utils/app-error"));

exports.createGroup = catchAsync(async (req, res, next) => {
  const { name, pic, members } = req.body;
  const admin = req.user._id;

  if (!name || !members) {
    return next(new AppError("Provide Name and members to create group", 400));
  }
  if (typeof members !== "object") {
    return next(new AppError("Members must be an Array to create group", 400));
  }

  let group = await Group.create({ name, pic, members, admin });
  if (!group) {
    return next(new AppError("Error creating group", 400));
  }

  group = await Group.findOne(group._id)
    .populate({ path: "admin", select: "name email pic" })
    .populate({ path: "members", select: "name email pic" });
  if (!group) {
    return next(new AppError("Error creating group", 400));
  }

  res.status(201).json({
    status: "success",
    message: "Group Created Successfully",
    data: { group },
  });
});

exports.deleteGroup = catchAsync(async (req, res, next) => {
  await Message.deleteMany({ group: req.params.id });
  await Group.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    message: "Group Deleted Successfully",
    data: null,
  });
});

exports.getGroupInfo = catchAsync(async (req, res, next) => {
  const groupId = req.params.id;

  const group = await Group.findById(groupId)
    .populate({ path: "admin", select: "name email pic" })
    .populate({ path: "members", select: "name email pic" })
    .populate({
      path: "latestMessage",
      select: "content",
      populate: { path: "sender", select: "name pic email" },
    });
  if (!group) {
    return next(new AppError("Invalid group ID", 401));
  }

  if (
    group.members.find((member) => member._id.equals(req.user._id)) ||
    group.admin._id.equals(req.user._id)
  )
    return res.status(200).json({
      status: "success",
      message: "Group Info. Retrieved Successfully",
      data: { group },
    });

  return next(
    new AppError(
      "Only a Group admin or member has access to group information",
      401
    )
  );
});

exports.renameGroup = catchAsync(async (req, res, next) => {
  const name = req.body.name;

  if (!name) {
    return next(
      new AppError("Group name must be provided in request body", 400)
    );
  }

  const group = await Group.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  )
    .populate({ path: "admin", select: "name pic email" })
    .populate({ path: "members", select: "name pic email" })
    .populate({
      path: "latestMessage",
      select: "content",
      populate: { path: "sender", select: "name pic email" },
    });

  if (!group) {
    return next(new AppError("Invalid group ID", 404));
  }

  return res.status(202).json({
    status: "success",
    message: "Group name updated successfully",
    data: { updatedGroup: group },
  });
});

exports.addMember = catchAsync(async (req, res, next) => {
  const groupId = req.params.id;

  const { members } = req.body;
  if (!members) {
    return next(
      new AppError(
        "Members that are to be added must be provided in request body",
        400
      )
    );
  }

  if (typeof members !== "object") {
    return next(new AppError("Members must be array of user ids", 400));
  }

  for (const member of members) {
    try {
      await User.findById(member);
    } catch (error) {
      return next(new AppError(`Invalid member ID "${member}" given`, 400));
    }
  }

  const group = await Group.findByIdAndUpdate(
    groupId,
    { $addToSet: { members: { $each: members } } },
    { new: true }
  )
    .populate({ path: "admin", select: "name pic email" })
    .populate({ path: "members", select: "name pic email" })
    .populate({
      path: "latestMessage",
      select: "content",
      populate: { path: "sender", select: "name pic email" },
    });

  if (!group) {
    return next(
      new AppError("Error adding members, try again after some time", 500)
    );
  }

  res.status(202).json({
    status: "success",
    message: "Members added successfully",
    data: { updatedGroup: group },
  });
});

exports.removeMember = catchAsync(async (req, res, next) => {
  const { members } = req.body;

  if (!members) {
    return next(
      new AppError(
        "Members that are to be removed must be provided in request body",
        400
      )
    );
  }

  if (typeof members !== "object") {
    return next(new AppError("Members must be array of user ids", 400));
  }

  for (const member of members) {
    try {
      await User.findById(member);
    } catch (error) {
      return next(new AppError(`Invalid member ID "${member}" given`, 400));
    }
  }

  const group = await Group.findByIdAndUpdate(
    req.params.id,
    { $pull: { members: { $in: members } } },
    { new: true }
  )
    .populate({ path: "admin", select: "name pic email" })
    .populate({ path: "members", select: "name pic email" })
    .populate({
      path: "latestMessage",
      select: "content",
      populate: { path: "sender", select: "name pic email" },
    });

  if (!group) {
    return next(
      new AppError("Error removing members, try again after some time", 500)
    );
  }

  res.status(202).json({
    status: "success",
    message: "Members removed successfully",
    data: { updatedGroup: group },
  });
});

exports.getAllRecentGroups = catchAsync(async (req, res, next) => {
  let recentGroups = await Group.find({
    $or: [{ admin: req.user._id }, { members: req.user._id }],
  })
    .select("name pic _id latestMessage")
    .populate({
      path: "latestMessage",
      select: "content sender createdAt",
      populate: { path: "sender", select: "name" },
    });

  recentGroups = recentGroups
    .map((group) => {
      return {
        name: group.name,
        pic: group.pic,
        _id: group._id,
        latestMessage: {
          content: group.latestMessage?.content,
          senderName:
            group.latestMessage?.sender.name === req.user.name
              ? "You"
              : group.latestMessage?.sender.name,
          time: group.latestMessage?.createdAt,
        },
      };
    })
    .sort(
      (a, b) =>
        new Date(b.latestMessage.time).getTime() -
        new Date(a.latestMessage.time).getTime()
    );

  res.status(200).json({
    status: "success",
    message: "Recent Groups",
    result: recentGroups.length,
    data: { recentGroups },
  });
});

exports.searchGroup = catchAsync(async (req, res, next) => {
  const searchTerm = req.query.search;
  const findQuery = searchTerm
    ? { name: { $regex: searchTerm, $options: "i" } }
    : {};
  findQuery.$or = [{ members: req.user._id }, { admin: req.user._id }];

  const groups = await Group.find(findQuery)
    .select("-createdAt -updatedAt -__v -members -admin")
    .populate({
      path: "latestMessage",
      select: "content sender createdAt -_id",
      populate: { path: "sender", select: "name pic -_id" },
    });

  res.status(200).json({
    status: "success",
    message: "Search Group Results",
    result: groups.length,
    data: { groups },
  });
});
