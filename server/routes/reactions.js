const router = require("express").Router();
const reactioinControllers = require("../controllers/reactions");

router.put("/votes", reactioinControllers.updateVote);
// router.get("/votes/:id", reactioinControllers.getReactionsByUserId);
router.get("/votes", reactioinControllers.getUsersVotes);
router.get("/votes/total", reactioinControllers.getTotalVotes);
router.post("/comment", reactioinControllers.createCommment);
router.get("/comment/:id", reactioinControllers.getComments);

module.exports = router;
