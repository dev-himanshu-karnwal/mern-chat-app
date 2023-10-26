const express = require("express");
const path = require("path");
const userController = require(path.join(
  __dirname,
  "./../controllers/user-controllers"
));

const router = express.Router();

router.post("/signup", userController.signUp);
router.get("/login", userController.login);

module.exports = router;
