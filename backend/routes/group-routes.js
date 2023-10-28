const express = require("express");
const path = require("path");
const authController = require(path.join(
  __dirname,
  "./../controllers/auth-controllers"
));
const groupController = require(path.join(
  __dirname,
  "./../controllers/group-controllers"
));

const router = express.Router();

router.use(authController.protect);

router.post("/", groupController.createGroup);

router
  .route("/:id")
  .delete(authController.restrictToGroupAdmin, groupController.deleteGroup)
  .get(groupController.getGroupInfo)
  .patch(authController.restrictToGroupAdmin, groupController.renameGroup);

router.use(authController.restrictToGroupAdmin);

router
  .route("/:id/members")
  .post(groupController.addMember)
  .delete(groupController.removeMember);

module.exports = router;
