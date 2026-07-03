import { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext();

// Provider wraps the whole app and shares user state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Call this after successful login
  const login = (userData) => {
    setUser(userData);
  };

  // Call this on logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook — use this in any component to get user info
export const useAuth = () => useContext(AuthContext);