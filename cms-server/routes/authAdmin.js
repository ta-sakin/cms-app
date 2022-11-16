const router = require("express").Router();
const authAdminControllers = require("../controllers/authAdmin");

router.post("/create", authAdminControllers.createAdmin);
router.get("/token", authAdminControllers.getToken);
// router.get("/:id", adminControllers.getAdmin);

module.exports = router;
