const router = require("express").Router();
const adminControllers = require("../controllers/authAdmin");

router.post("/create", adminControllers.createAdmin);
// router.get("/:id", adminControllers.getAdmin);

module.exports = router;
