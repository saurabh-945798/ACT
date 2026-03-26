import { useEffect, useState } from "react";
import AuthContext from "./authContext";
import { clearAuth, getStoredAuth, setStoredAuth } from "../utils/authStorage";
import { isAuthenticated as isAuthStored, login as storeLogin, logout as storeLogout } from "../utils/auth";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => getStoredAuth());

  useEffect(() => {
    if (!auth?.token) {
      clearAuth();
      return;
    }

    setStoredAuth(auth);
  }, [auth]);

  const login = ({ token, user }) => {
    const nextAuth = { token, user };
    storeLogin(nextAuth);
    setAuth(nextAuth);
  };

  const logout = () => {
    storeLogout();
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider
      value={{
        token: auth?.token ?? null,
        user: auth?.user ?? null,
        login,
        logout,
        isAuthenticated: Boolean(auth?.token) && isAuthStored(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
