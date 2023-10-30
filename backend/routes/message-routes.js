const express = require("express");
const path = require("path");
const authController = require(path.join(
  __dirname,
  "./../controllers/auth-controllers"
));
const messageController = require(path.join(
  __dirname,
  "./../controllers/message-controllers"
));

const router = express.Router();

router.use(authController.protect);

router.post("/", messageController.createMessage);
router
  .route("/:id")
  .delete(messageController.completelyDeleteMessage)
  .patch(messageController.deleteMessage);

// TODO: get all messages of a particular chat or group

module.exports = router;
