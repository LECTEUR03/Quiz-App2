const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/auth");

router.post("/", userController.create);
router.post("/auth", userController.auth);

router.get("/users", verifyToken, userController.getAllUsers);
router.get("/user/:id", verifyToken, userController.getUserById);
router.put("/update/user/:id", verifyToken, userController.update);
router.delete("/delete/user/:id", verifyToken, userController.deleteUser);

module.exports = router;
