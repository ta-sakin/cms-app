const router = require("express").Router();
const authRoutes = require("./auth");
const complainRoutes = require("./complain");

router.use("/api/auth", authRoutes);
router.use("/api", complainRoutes);

module.exports = router;
