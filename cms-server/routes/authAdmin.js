const router = require("express").Router();
const adminControllers = require("../controllers/authAdmin");

router.post("/createadmin", adminControllers.createAdmin);

module.exports = router;
