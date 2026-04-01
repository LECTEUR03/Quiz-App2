const Quiz = require("../models/quiz");

exports.getQuizzes = async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
};

exports.createQuiz = async (req, res) => {
  const newQuiz = new Quiz(req.body);
  await newQuiz.save();
  res.json({ message: "Quiz ajouté !" });
};