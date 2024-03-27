import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

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
  userData: User | null;
  token: string | null;
  setToken: (token: string) => void;
  saveUserData: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  userData: null,
  token: null,
  setToken: () => {},
  saveUserData: () => {},
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );

  const saveUserData = () => {
    try {
      if (token) {
        const decodedToken = jwtDecode(token!) as User;
        setUserData(decodedToken);
      }
    } catch (error) {
      toast.error("Invalid or missing token");
    }
  };

  useEffect(() => {
    if (token) saveUserData();
  }, [token]);

  return (
    <AuthContext.Provider value={{ userData, token, setToken, saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
