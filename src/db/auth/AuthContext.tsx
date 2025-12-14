import React, { createContext, useContext, useState, ReactNode } from "react";
import { fetchById } from "../funcs/fetchById";
import { UserType } from "../types/UserType";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function login(username: string, password: string): Promise<boolean> {
    try {
      const data = await fetchById("users", username.trim(), "username");
      const fetchedUser = data as UserType[];

      if (
        fetchedUser.length > 0 &&
        String(username.trim()) === String(fetchedUser[0].username) &&
        String(password.trim()) === String(fetchedUser[0].password)
      ) {
        setIsAuthenticated(true);
        return true; // <-- properly returns from the function
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      return false;
    }
  }

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
