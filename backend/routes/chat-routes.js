const express = require("express");
const path = require("path");
const authController = require(path.join(
  __dirname,
  "./../controllers/auth-controllers"
));
const chatController = require(path.join(
  __dirname,
  "./../controllers/chat-controllers"
));

const router = express.Router();

router.use(authController.protect);

router.get("/", chatController.getAllRecentChats);
router.get("/:id", chatController.getChat);

module.exports = router;
