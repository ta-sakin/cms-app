const complainsController = require("../controllers/complain");

const router = require("express").Router();

router.post("/", complainsController.submitComplain);
router.get("/uname", complainsController.findUserName);
router.get("/count/:id", complainsController.getCountComplaintStatus);
router.get("/all", complainsController.getAllComplains);
router.get("/total", complainsController.totalComplains);
router.delete("/:id", complainsController.deleteComplain);
router.put("/", complainsController.updateComplain);
router.get("/:id", complainsController.getComplainByUserId);

module.exports = router;
