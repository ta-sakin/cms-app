const router = require("express").Router();
const authAdminControllers = require("../controllers/authAdmin");

router.post("/create", authAdminControllers.createAdmin);
router.get("/token", authAdminControllers.getToken);
// router.get("/:id", adminControllers.getAdmin);
router.get("/jwt", authAdminControllers.checkJWT);

module.exports = router;
