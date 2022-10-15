const {
  signUpControllers,
  checkUserControllers,
  signInControllers,
  tokenControllers,
} = require("../controllers/auth");

const router = require("express").Router();

router.post("/checkUser", checkUserControllers);
router.post("/signup", signUpControllers);
router.post("/signin", signInControllers);
router.post("/token", tokenControllers);
module.exports = router;
