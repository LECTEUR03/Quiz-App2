const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const verifyToken = require("../middleware/auth");

router.get("/", quizController.getQuizzes);
router.get("/filtre", quizController.filtreCategory);
router.get("/results", quizController.getResults);

router.post("/", verifyToken, quizController.createQuiz);
router.put("/update/:id", verifyToken, quizController.updateQuiz);
router.delete("/:id", verifyToken, quizController.deleteQuiz);
router.post("/results", verifyToken, quizController.saveResult);

module.exports = router;
