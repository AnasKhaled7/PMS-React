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
  token: string | null;
  userData: User | null;
  saveUserData: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  userData: null,
  saveUserData: () => {},
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<User | null>(null);
  const token = localStorage.getItem("token");

  const saveUserData = () => {
    try {
      if (token) {
        const decodedToken = jwtDecode(token!) as User;
        setUserData(decodedToken);
      }
    } catch (error) {
      console.error("Invalid or missing token", error);
      setUserData(null);
      toast.error("Invalid or missing token");
    }
  };

  useEffect(() => {
    if (token) saveUserData();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, userData, saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
