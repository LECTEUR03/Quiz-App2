async function afficherTousLesQuiz() {
  const token = localStorage.getItem('token');
  const container = document.getElementById("adminList");

  try {
    const response = await fetch("/quiz");
    const quizzes  = await response.json();
    container.innerHTML = "";

    if (!Array.isArray(quizzes) || quizzes.length === 0) {
      container.innerHTML = "<p style='color:#6b7280;text-align:center;padding:32px 0;'>Aucun quiz créé pour le moment.</p>";
      return;
    }

    quizzes.forEach((quiz) => {
      const catNom  = quiz.categorie?.nom || 'Sans catégorie';
      const nbQ     = quiz.questions?.length || 0;
      const div     = document.createElement("div");
      div.className = "quiz-item";
      div.innerHTML = `
        <div>
          <strong>${quiz.title || 'Sans titre'}</strong>
          <span style="display:inline-block;background:#fff0eb;color:#F4613A;font-size:11px;font-weight:700;padding:2px 10px;border-radius:20px;margin-left:8px;">${catNom}</span>
          <p style="color:#6b7280;font-size:13px;margin-top:4px;">${nbQ} question(s)</p>
        </div>
        <button onclick="supprimerQuiz('${quiz._id}')">🗑️ Supprimer</button>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    container.innerHTML = `<p style="color:red;">Erreur de chargement : ${err.message}</p>`;
  }
}

async function supprimerQuiz(id) {
  if (!confirm('Supprimer ce quiz ?')) return;
  const token = localStorage.getItem('token');
  await fetch(`/quiz/${id}`, {
    method: "DELETE",
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  afficherTousLesQuiz();
}

afficherTousLesQuiz();
