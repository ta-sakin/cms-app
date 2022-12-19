const userController = require("../controllers/users");

const router = require("express").Router();

router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUsers);
router.patch("/:id", userController.updateUser);
router.post("/current", userController.getCurrentUser);
module.exports = router;
