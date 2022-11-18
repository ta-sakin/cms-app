const router = require("express").Router();
const adminControllers = require("../controllers/admin");
const authenticate = require("../middleware/authenticate");

router.get("/user", adminControllers.getCurrentUser);
router.get("/datacount", adminControllers.getDataCount);

module.exports = router;
