function saveToken(token) {
  if (!token) {
    return;
  }
  localStorage.setItem('token', token);
}

function getToken() {
  return localStorage.getItem('token');
}

export { getToken, saveToken };
