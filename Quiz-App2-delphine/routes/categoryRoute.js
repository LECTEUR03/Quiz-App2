const express = require("express");
const router = express.Router();
const quizController = require("../controllers/categorieController");
const verifyToken = require("../middleware/auth");

router.get("/", quizController.getCategory);
router.post("/", verifyToken, quizController.createCategory);
router.put("/update/:id", verifyToken, quizController.updateCategory);
router.delete("/:id", verifyToken, quizController.deleteCategory);

module.exports = router;
