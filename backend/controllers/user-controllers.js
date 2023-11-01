const path = require("path");
const jwt = require("jsonwebtoken");
const User = require(path.join(__dirname, "./../models/user-model"));
const catchAsync = require(path.join(__dirname, "./../utils/catch-async"));
const AppError = require(path.join(__dirname, "./../utils/app-error.js"));

exports.searchUser = catchAsync(async (req, res, next) => {
  const searchTerm = req.query.search;
  const keyword = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { email: { $regex: searchTerm, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .select("-password -createdAt -updatedAt -__v");

  res.status(200).json({
    status: "success",
    result: users.length,
    data: { users },
  });
});
