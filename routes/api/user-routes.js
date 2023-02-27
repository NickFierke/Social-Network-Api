const router = require("express").Router();

const {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

router.route("/users").get(getUser).post(createUser);

router.route("/users/:id").get(getUserById).put(updateUser).delete(deleteUser);

router
  .route("/users/:id/friends/:friendsId")
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;
