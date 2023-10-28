const path = require("path");
const User = require(path.join(__dirname, "./../models/user-model.js"));
const Group = require(path.join(__dirname, "./../models/group-model.js"));
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

exports.deleteGroup = catchAsync(async (req, res, next) => {});
exports.getGroupInfo = catchAsync(async (req, res, next) => {});
exports.renameGroup = catchAsync(async (req, res, next) => {});
exports.addMember = catchAsync(async (req, res, next) => {});
exports.removeMember = catchAsync(async (req, res, next) => {});
