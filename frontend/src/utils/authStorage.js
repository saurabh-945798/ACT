const TOKEN_KEY = "act.auth.token";
const USER_KEY = "act.auth.user";

export function getStoredAuth() {
  const token = localStorage.getItem(TOKEN_KEY);
  const userRaw = localStorage.getItem(USER_KEY);

  if (!token) {
    return { token: null, user: null };
  }

  try {
    return {
      token,
      user: userRaw ? JSON.parse(userRaw) : null,
    };
  } catch {
    clearAuth();
    return { token: null, user: null };
  }
}

export function setStoredAuth({ token, user }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user ?? null));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function hasToken() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}
