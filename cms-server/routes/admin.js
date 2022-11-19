const router = require("express").Router();
const adminControllers = require("../controllers/admin");
const authenticate = require("../middleware/authenticate");

router.get("/user", adminControllers.getCurrentUser);
router.get("/datacount", adminControllers.getDataCount);
router.get("/usersbyward", adminControllers.citizenByward);

module.exports = router;
