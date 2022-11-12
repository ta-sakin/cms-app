const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const authRoutes = require("./auth");
const authAdminRoutes = require("./authAdmin");
const userRoutes = require("./user");
const complainRoutes = require("./complain");
const reactionsRoutes = require("./reactions");

router.use("/api/auth", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/auth", authAdminRoutes);
router.use("/api", authenticate, complainRoutes);
router.use("/api/react", authenticate, reactionsRoutes);

module.exports = router;
