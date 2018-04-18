function saveToken(token) {
  if (!token) {
    togglePopup();
  }
  localStorage.setItem('token', token);
}

function getToken() {
  return localStorage.getItem('token');
}

function togglePopup({ display = false }) {
  const popup = document.querySelector('.login-popup-container');
  const isHidden = popup.classList.contains('hidden');
  if (display && isHidden) {
    popup.classList.remove('hidden');
  }

  if (!display) {
    popup.classList.add('hidden');
  }
}

export { getToken, saveToken, togglePopup };
