// authService.js
const TOKEN_KEY = 'userLoggedInTokenKEY';

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenValid = () => {
  const token = getAuthToken();
  return !!token; // Returns true if the token exists, regardless of its validity
};
