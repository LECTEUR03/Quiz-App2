let score = 0;
let total = 0;

async function afficherQuiz() {
  const container = document.getElementById("quizContainer");

  try {
    const response = await fetch("/quiz");
    const quizzes  = await response.json();

    if (!Array.isArray(quizzes) || quizzes.length === 0) {
      container.innerHTML = '<p style="color:#9ca3af;text-align:center;padding:40px;">Aucun quiz disponible pour le moment.</p>';
      return;
    }

    const quiz = quizzes[0];
    const questions = quiz.questions || [];
    total = questions.length;

    if (total === 0) {
      container.innerHTML = '<p style="color:#9ca3af;text-align:center;padding:40px;">Ce quiz ne contient pas encore de questions.</p>';
      return;
    }

    questions.forEach((q) => {
      const div = document.createElement("div");
      div.className = "quiz-card";

      if (!q.options || !Array.isArray(q.options)) return;

      const boutons = q.options.map(option => `
        <button onclick="verifierReponse(this, '${option.replace(/'/g, "\\'")}', '${q.correct.replace(/'/g, "\\'")}')">
          ${option}
        </button>
      `).join("");

      div.innerHTML = `
        <p><strong>${q.question}</strong></p>
        ${boutons}
        <p class="resultat"></p>
        <hr>
      `;

      container.appendChild(div);
    });

    const boutonScore = document.createElement("button");
    boutonScore.textContent = "Voir mon score";
    boutonScore.onclick = afficherScore;
    container.appendChild(boutonScore);

  } catch (err) {
    container.innerHTML = `<p style="color:red;text-align:center;">Erreur de chargement : ${err.message}</p>`;
  }
}

function verifierReponse(bouton, optionChoisie, bonneReponse) {
  const resultat = bouton.parentElement.querySelector(".resultat");
  bouton.parentElement.querySelectorAll("button").forEach(b => b.disabled = true);

  if (optionChoisie === bonneReponse) {
    resultat.textContent = "✅ Bonne réponse !";
    resultat.style.color = "green";
    score++;
  } else {
    resultat.textContent = `❌ Mauvaise réponse ! La bonne réponse était : ${bonneReponse}`;
    resultat.style.color = "red";
  }
}

async function afficherScore() {
  await fetch("/quiz/results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score, total })
  });

  const container = document.getElementById("quizContainer");
  const scoreDiv  = document.createElement("div");
  scoreDiv.className = "score-card";
  scoreDiv.innerHTML = `
    <h2>🎯 ${score} / ${total}</h2>
    <p>Tu as eu ${score} bonne(s) réponse(s) sur ${total} !</p>
    <br>
    <button onclick="location.reload()">Recommencer</button>
    <button onclick="window.location.href='results.html'" style="background:white; color:#4f46e5;">
      📊 Voir l'historique
    </button>
  `;
  container.appendChild(scoreDiv);
}

afficherQuiz();
