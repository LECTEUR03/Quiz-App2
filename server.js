// 
const express = require("express"); // Importation du module Express
const fs = require("fs");           // Importation du module fs pour la gestion des fichiers


// Initialisation de l'application Express
const app = express();              // Création d'une instance de l'application Express
const PORT = 3000;                   // Définition du port sur lequel le serveur écoutera


app.use(express.json());
app.use(express.static("public"));

// Récupérer tous les quiz
app.get("/quiz", (req, res) => {                      
  const data = fs.readFileSync("quizzes.json");
  res.json(JSON.parse(data));
});





// Ajouter un quiz
app.post("/quiz", (req, res) => {
  const newQuiz = req.body;
  
  const data = JSON.parse(fs.readFileSync("quizzes.json"));
  data.push(newQuiz);

  fs.writeFileSync("quizzes.json", JSON.stringify(data, null, 2));

  res.json({ message: "Quiz ajouté !" });
});



app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});