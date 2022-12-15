const router = require("express").Router();
const authRoutes = require("./auth");
const authAdminRoutes = require("./authAdmin");
const adminRoutes = require("./admin");
const userRoutes = require("./user");
const complainRoutes = require("./complain");
const reactionsRoutes = require("./reactions");
const { authenticate, adminAuth } = require("../middleware/authenticate");

router.use("/api/user/auth", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/admin/auth", authAdminRoutes);
router.use("/api/admin", adminAuth, adminRoutes);
router.use("/api/user/complain", authenticate, complainRoutes);
router.use("/api/user/react", authenticate, reactionsRoutes);

module.exports = router;
