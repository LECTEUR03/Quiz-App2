/* ── Navigation ── */
function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  clearAllErrors();
  document.getElementById('reset-success').style.display = 'none';
}

/* ── Helpers ── */
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function setError(inputId, msgId, show) {
  document.getElementById(inputId).classList.toggle('error-field', show);
  document.getElementById(msgId).style.display = show ? 'block' : 'none';
}

function clearAllErrors() {
  document.querySelectorAll('.error-msg').forEach(e => e.style.display = 'none');
  document.querySelectorAll('input').forEach(i => i.classList.remove('error-field'));
}

function setLoading(btnId, on) {
  document.getElementById(btnId).classList.toggle('loading', on);
}

/* ── Afficher/masquer mot de passe ── */
const EYE_ON  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const EYE_OFF = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

function togglePw(inputId, btn) {
  const inp = document.getElementById(inputId);
  const hidden = inp.type === 'password';
  inp.type = hidden ? 'text' : 'password';
  btn.innerHTML = hidden ? EYE_OFF : EYE_ON;
}

/* ── Redirection après login ── */
function redirectApresLogin() {
  const categorie = sessionStorage.getItem('redirectCategorie');
  sessionStorage.removeItem('redirectCategorie');
  if (categorie) {
    window.location.href = `quiz.html?categorie=${encodeURIComponent(categorie)}`;
  } else {
    window.location.href = 'sd.html';
  }
}

/* ── Connexion ── */
async function handleLogin() {
  const email    = document.getElementById('email').value;
  const motpasse = document.getElementById('password').value;

  setError('email',    'err-email',    !isEmail(email));
  setError('password', 'err-password', !motpasse);
  if (!isEmail(email) || !motpasse) return;

  setLoading('btn-login', true);

  try {
    const res  = await fetch('/user/auth', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, motpasse })
    });
    const data = await res.json();

    if (data.status === 'success') {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user',  JSON.stringify(data.user));
      redirectApresLogin();
    } else {
      const msg = document.getElementById('err-password');
      msg.textContent = data.message || 'Identifiants incorrects.';
      msg.style.display = 'block';
      document.getElementById('password').classList.add('error-field');
    }
  } catch (err) {
    const msg = document.getElementById('err-password');
    msg.textContent = 'Erreur serveur. Réessayez.';
    msg.style.display = 'block';
  } finally {
    setLoading('btn-login', false);
  }
}

/* ── Mot de passe oublié ── */
function handleReset() {
  const email = document.getElementById('forgot-email').value;
  setError('forgot-email', 'err-forgot', !isEmail(email));
  if (!isEmail(email)) return;

  setLoading('btn-reset', true);
  setTimeout(() => {
    setLoading('btn-reset', false);
    document.getElementById('reset-success').style.display = 'block';
    document.getElementById('forgot-email').value = '';
  }, 1800);
}

/* ── Inscription ── */
async function handleRegister() {
  const nom      = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value;
  const motpasse = document.getElementById('reg-pw').value;

  setError('reg-name',  'err-reg-name',  !nom);
  setError('reg-email', 'err-reg-email', !isEmail(email));
  setError('reg-pw',    'err-reg-pw',    motpasse.length < 8);
  if (!nom || !isEmail(email) || motpasse.length < 8) return;

  setLoading('btn-register', true);

  try {
    const res  = await fetch('/user/', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ nom, email, motpasse })
    });
    const data = await res.json();

    if (res.status === 201) {
      alert(`🎉 Bienvenue ${nom} ! Connectez-vous.`);
      showView('view-login');
    } else {
      const msg = document.getElementById('err-reg-email');
      msg.textContent = data.message || 'Erreur lors de la création du compte.';
      msg.style.display = 'block';
      document.getElementById('reg-email').classList.add('error-field');
    }
  } catch (err) {
    alert('Erreur serveur. Réessayez.');
  } finally {
    setLoading('btn-register', false);
  }
}

/* ── Live validation ── */
document.getElementById('email').addEventListener('blur', function() {
  if (this.value) setError('email', 'err-email', !isEmail(this.value));
});
document.getElementById('password').addEventListener('input', function() {
  if (this.value) setError('password', 'err-password', false);
});
document.getElementById('forgot-email').addEventListener('blur', function() {
  if (this.value) setError('forgot-email', 'err-forgot', !isEmail(this.value));
});
document.getElementById('reg-pw').addEventListener('input', function() {
  if (this.value.length >= 8) setError('reg-pw', 'err-reg-pw', false);
});
