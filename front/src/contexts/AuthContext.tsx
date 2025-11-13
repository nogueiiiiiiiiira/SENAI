import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { AuthContextType, Librarian } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Librarian | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Validate token with backend
      setIsAuthenticated(true);
      // TODO: Fetch user data
    }
  }, []);

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const url = "http://localhost:3001/login";
      const { data: res } = await axios.post(url, { email, senha });
      localStorage.setItem("token", res.token);
      setIsAuthenticated(true);
      // TODO: Set user data from response
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
