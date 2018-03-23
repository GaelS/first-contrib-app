const { AUTH_URL } = process.env;

function saveToken(token) {
  if (!token) {
    redirectToLogin();
  }
  localStorage.setItem('token', token);
}

function redirectToLogin() {
  window.location = AUTH_URL;
}
function getToken() {
  return localStorage.getItem('token');
}

export { getToken, redirectToLogin, saveToken };
