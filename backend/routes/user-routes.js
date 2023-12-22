const express = require("express");
const path = require("path");
const userController = require(path.join(
  __dirname,
  "./../controllers/user-controllers"
));
const authController = require(path.join(
  __dirname,
  "./../controllers/auth-controllers"
));

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.get("/", authController.protect, userController.searchUser);

module.exports = router;
