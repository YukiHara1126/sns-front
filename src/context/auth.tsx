import apiClient from "@/lib/apiClient";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
  user: {
    id: number;
    email: string;
    username: string;
  } | null;
}

const AuthContext = React.createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  user: null,
});

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<null | {
    id: number;
    email: string;
    username: string;
  }>(null);
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
      apiClient
        .get("/users/find")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
      const res = await apiClient.get("/users/find");
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  const logout = async () => {
    localStorage.removeItem("auth_token");
    delete apiClient.defaults.headers["Authorization"];
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ login: (token: string) => login(token), logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
