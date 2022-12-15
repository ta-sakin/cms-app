const router = require("express").Router();
const adminControllers = require("../controllers/admin");

router.get("/user", adminControllers.getCurrentUser);
router.get("/datacount", adminControllers.getDataCount);
router.get("/usersbyward", adminControllers.citizenByward);
router.patch("/userstatus/:id", adminControllers.changeUserStatus);
router.delete("/deleteuser/:id", adminControllers.deleteUser);
router.get("/userdetails/:id", adminControllers.userDetails);
router.get("/complains/:id", adminControllers.getComplainsByUserId);
router.get("/comment/:id", adminControllers.getComments);
router.get("/react/total", adminControllers.getTotalReact);
router.get("/mcomplains", adminControllers.loadComplains);
router.get("/mcomplains/:cid", adminControllers.complainDetails);
router.post("/assign", adminControllers.assignComplain);
router.get("/assign", adminControllers.getStatusDetails);
router.put("/assign", adminControllers.updateAssignedComplain);
router.get("/statusdate/:cid", adminControllers.getStatusDate);

module.exports = router;
