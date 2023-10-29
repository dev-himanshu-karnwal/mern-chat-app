const path = require("path");
const jwt = require("jsonwebtoken");
const { group } = require("console");
const User = require(path.join(__dirname, "./../models/user-model.js"));
const Group = require(path.join(__dirname, "./../models/group-model.js"));
const catchAsync = require(path.join(__dirname, "./../utils/catch-async"));
const AppError = require(path.join(__dirname, "./../utils/app-error"));

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword, pic } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return next(
      new AppError("Enter Name, Email, Password and Confirm Password", 400)
    );
  }

  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("Email already exists.", 400));
  }

  const newUser = await User.create({ name, email, password, pic });

  res.status(201).json({
    status: "success",
    message: "User Created Successfully",
    data: { user: newUser },
    token: signToken(newUser._id),
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return next(new AppError("Invalid login email or password.", 401));
  }

  res.status(201).json({
    status: "success",
    message: "User Logged in successfully",
    data: { user },
    token: signToken(user._id),
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");
      if (!user) return next(new AppError("you are not Logged in", 401));

      req.user = user;
    } catch (err) {
      return next(new AppError("Login to continue.", 401));
    }
  }
  if (!token)
    next(new AppError("you are not logged in. Login to continue..", 401));

  next();
});

exports.restrictToGroupAdmin = catchAsync(async (req, res, next) => {
  const groupId = req.params.id;

  const group = await Group.findById(groupId);
  if (!group) {
    return next(new AppError("Invalid Group ID", 404));
  }

  if (group.admin !== req.user._id) {
    return next(
      new AppError("Only admins are allowed to perform the action", 401)
    );
  }

  next();
});
