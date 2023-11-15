var express = require("express");
var userController = require("../controller/usersController");

var router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
