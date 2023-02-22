const router = require("express").Router();

const {
  getThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  makeReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

router.route("/thoughts").get(getThought).post(createThought);

router
  .route("/thoughts/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/thoughts/:thoughtId/reactions").post(makeReaction);

router
  .route("/thoughts/:thoughtId/reactions/:reactionId")
  .delete(removeReaction);

module.exports = router;
