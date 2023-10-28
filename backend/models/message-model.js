const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      required: [true, "Sender id is required to send a message"],
      ref: "User",
    },
    content: {
      type: String,
      required: [true, "Message Content is required to send a message"],
      trim: true,
    },
    isGroupMessage: {
      type: Boolean,
      required: [
        true,
        "Specifying wether mesaage is a group message or not is required",
      ],
    },
    reciever: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    group: {
      type: mongoose.Types.ObjectId,
      ref: "Group",
    },
    deletedFor: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
