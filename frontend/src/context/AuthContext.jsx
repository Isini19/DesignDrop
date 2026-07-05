import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check if user is already logged in from localStorage
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    if (token && email && role) {
      return { email, role };
    }
    return null;
  });

  const login = (userData) => {
    // Save to localStorage so user stays logged in after refresh
    localStorage.setItem('email', userData.email);
    localStorage.setItem('role', userData.role);
    setUser(userData);
  };

  const logout = () => {
    // Clear everything from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);