import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const LOCAL_STORAGE_KEY = "rotten-potatoes-token";
const persistedToken = localStorage.getItem(LOCAL_STORAGE_KEY);
export function AuthProvider({ children }) {
  const [token, setToken] = useState(persistedToken);

  function signIn(token, picture) {
    setToken(token);
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
  }

  function signOut() {
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return <AuthContext.Provider value={{ token, signIn, signOut }}>{children}</AuthContext.Provider>;
}
