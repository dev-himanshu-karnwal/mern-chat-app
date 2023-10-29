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
router.get("/:id", groupController.getGroupInfo);

router
  .route("/:id")
  .delete(authController.restrictToGroupAdmin, groupController.deleteGroup)
  .patch(authController.restrictToGroupAdmin, groupController.renameGroup);

router
  .route("/:id/members")
  .post(authController.restrictToGroupAdmin, groupController.addMember)
  .delete(authController.restrictToGroupAdmin, groupController.removeMember);

module.exports = router;
