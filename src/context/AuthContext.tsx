import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  userId: number;
  roles: string[];
  userName: string;
  userEmail: string;
  userGroup: string;
  exp: number;
  iat: number;
}

interface AuthContextType {
  token: string | null;
  baseURL: string;
  userData: User | null;
  saveUserData: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  baseURL: "",
  userData: null,
  saveUserData: () => {},
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<User | null>(null);
  const token = localStorage.getItem("token");
  const baseURL = "https://upskilling-egypt.com:3003/api/v1";

  const saveUserData = () => {
    const decodedToken = jwtDecode(token!) as User;
    setUserData(decodedToken);
  };

  useEffect(() => {
    if (token) saveUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ token, baseURL, userData, saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
