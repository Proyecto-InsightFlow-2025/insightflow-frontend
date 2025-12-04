import React, {
  useState,
  type ReactNode,
} from "react";

import { AuthContext } from './useAuth';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(() => {
    return localStorage.getItem('userId');
  });

  const isAuthenticated = !!userId;

  const login = (newUserId: string) => {
    localStorage.setItem('userId', newUserId);
    setUserId(newUserId);
  };

  const logout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


