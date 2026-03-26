import { clearAuth, hasToken, setStoredAuth } from "./authStorage";

export function login({ token, user }) {
  setStoredAuth({ token, user });
}

export function logout() {
  clearAuth();
}

export function isAuthenticated() {
  return hasToken();
}
