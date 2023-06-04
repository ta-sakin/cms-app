const router = require("express").Router();
const reactionControllers = require("../controllers/reactions");
const { authenticate } = require("../middleware/authenticate");

router.put("/votes", reactionControllers.updateVote);
// router.get("/votes/:id", reactionControllers.getReactionsByUserId);
router.get("/votes", reactionControllers.getUsersVotes);
router.get("/votes/total", reactionControllers.getTotalVotes);
router.post("/comment", authenticate, reactionControllers.createCommment);
router.get("/comment/:id", reactionControllers.getComments);
// router.get("/modify", reactionControllers.modifyVotes);

module.exports = router;
