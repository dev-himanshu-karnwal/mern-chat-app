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

const socketController = require(path.join(
  __dirname,
  "./../controllers/socket-controller"
));

const router = express.Router();

router.use(authController.protect);

router.get("/user/:id", messageController.getChatMessages);
router.get("/group/:id", messageController.getGroupMessages);

router.post("/", messageController.createMessage);
router
  .route("/:id")
  .delete(messageController.completelyDeleteMessage)
  .patch(messageController.deleteMessage);

module.exports = router;
