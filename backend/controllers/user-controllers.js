const path = require("path");
const jwt = require("jsonwebtoken");
const User = require(path.join(__dirname, "./../models/user-model"));
const catchAsync = require(path.join(__dirname, "./../utils/catch-async"));
const AppError = require(path.join(__dirname, "./../utils/app-error.js"));

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
  if (!user || !user.matchPassword(password)) {
    return next(new AppError("Invalid login email or password.", 401));
  }

  res.status(201).json({
    status: "success",
    message: "User Logged in successfully",
    data: { user },
    token: signToken(user._id),
  });
});

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

  const users = await User.find(keyword); //.find({ _id: { $ne: req.user._id } });

  res.json(users);
});
