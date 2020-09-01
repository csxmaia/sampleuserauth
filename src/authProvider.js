import React, { createContext, useState, useEffect } from "react";
import jwtdecode from "jwt-decode";
import { doLogout } from "./auth";

export const AuthContext = createContext();

const initialUserData = {};

export const ProviderContext = ({ children }) => {
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    const token = localStorage.getItem("SUS_TOKEN");
    if (token) {
      var data = jwtdecode(token);
      if (Date.now() >= data.exp * 1000) {
        doLogout();
      }
      setUserData(data);
    }
  }, []);

  const onLogin = ({ token }) => {
    var data = jwtdecode(token);
    setUserData(data);
  };

  // const onLogout = () => {
  //   setUserData(initialUserData)
  // }

  return (
    <AuthContext.Provider
      value={{
        user: { ...userData },
        onLogin,
        // onLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
