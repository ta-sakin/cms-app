const complainsController = require("../controllers/complain");
const { authenticate } = require("../middleware/authenticate");

const router = require("express").Router();

router.post("/", authenticate, complainsController.submitComplain);
router.get("/uname", complainsController.findUserName);
router.get("/count/:id", complainsController.getCountComplaintStatus);
router.get("/all", complainsController.getAllComplains);
router.get("/total", complainsController.totalComplains);
router.delete("/:id", authenticate, complainsController.deleteComplain);
router.put("/", complainsController.updateComplain);
router.patch("/:id", authenticate, complainsController.editCategory);
router.get("/:id", complainsController.getComplainByUserId);
router.get("/statusdates/:id", complainsController.getStatusDatesByCID);

module.exports = router;
