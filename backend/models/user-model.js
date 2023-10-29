const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "Name is required for creating a user"],
      trim: true,
    },
    email: {
      type: "String",
      unique: [true, "Email is must to be provided"],
      required: [true, "Email is required for creating a user"],
      trim: true,
      validate: {
        validator: (email) => isEmail(email),
        message: `Enter a valid email`,
      },
    },
    password: {
      type: "String",
      required: [true, "Password is required for creating a user"],
    },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ role: { $ne: "admin" } });
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
