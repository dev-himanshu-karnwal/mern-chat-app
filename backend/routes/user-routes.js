const express = require("express");
const path = require("path");
const userController = require(path.join(
  __dirname,
  "./../controllers/user-controllers"
));

const router = express.Router();

router.get("/", userController.searchUser);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);

module.exports = router;
