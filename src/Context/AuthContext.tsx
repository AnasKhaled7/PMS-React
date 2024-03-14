import { jwtDecode } from "jwt-decode";
import React, { ReactNode, createContext, useEffect, useState } from "react";

type AuthValue = {
  saveUserData: () => void;
  baseURL: string;
  requestHeader: any;
  userData: string;
};

export const AuthContext = createContext<AuthValue>({
  saveUserData: () => {},
  baseURL: "",
  requestHeader: "",
  userData: "",
});

interface ProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<ProviderProps> = (props) => {
  const [loginData, setLoginData] = useState<any>(null);

  const baseURL = "https://upskilling-egypt.com:3003/api/v1";

  const requestHeader = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const saveUserData = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setLoginData(decodedToken);
    }
  };

  const contextValue: AuthValue = {
    saveUserData: saveUserData,
    baseURL: baseURL,
    requestHeader: requestHeader,
    userData: loginData,
  };

  useEffect(() => {
    saveUserData();
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
