const complainsController = require("../controllers/complain");

const router = require("express").Router();

router.post("/complain", complainsController.submitComplain);
router.get("/complain", complainsController.findUserName);
router.get("/complains/:id", complainsController.getComplainByUserId);
router.delete("/complain/:id", complainsController.deleteComplain);
router.get("/allcomplains", complainsController.getAllComplains);
router.get("/totalcomplains", complainsController.totalComplains);
router.put("/complain", complainsController.updateComplain);
router.get("/complain/:id", complainsController.getCountComplaintStatus);

module.exports = router;
