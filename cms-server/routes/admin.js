const router = require("express").Router();
const adminControllers = require("../controllers/admin");
const authenticate = require("../middleware/authenticate");

router.get("/get", adminControllers.getCurrentUser);

module.exports = router;
