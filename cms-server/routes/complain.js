const { complainControllers } = require("../controllers/complain");

const router = require("express").Router();

router.post("/complain", complainControllers);
module.exports = router;
