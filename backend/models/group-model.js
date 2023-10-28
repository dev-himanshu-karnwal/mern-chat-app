const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A group name must be provided"],
      trim: true,
    },
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "A group must have a admin"],
      trim: true,
    },
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: "Message",
    },
    pic: {
      type: "String",
      required: true,
      default:
        "https://cdn4.iconfinder.com/data/icons/avatar-1-2/100/Avatar-16-512.png",
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
