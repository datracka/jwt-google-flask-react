import decodeJWT from "jwt-decode";

export const TOKEN_KEY = "userToken";
const ISSUER = "https://accounts.google.com";

export function extractToken(response) {
  return response.xhr
    .getResponseHeader("Authorization")
    .split(" ")[1];
}

export function removeLocalStorageKey(key) {
  localStorage.removeItem(key);
}

export function saveInLocalStorage(key, token) {
  if (token) {
    // Remember the token
    localStorage.setItem(key, token);
  }
}

export function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

export function getValidToken(key) {
  const token = localStorage.getItem(key);
  try {
    const decodedToken = decodeJWT(token);
    // eslint-disable-next-line no-unused-vars
    const now = Date.now() / 1000;
    if (now > decodedToken.exp || ISSUER !== decodedToken.iss) {
      console.log("token not longer valid", decodedToken.iss);
      return null;
    }
    // Valid token
    return token;
  } catch (error) {
    // Invalid token
    return null;
  }
}

export function getDecodedToken(key) {
  const validToken = getValidToken(key);
  if (validToken) {
    return decodeJWT(validToken);
  }
  return null;
}
