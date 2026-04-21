import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const ContextData = createContext();

export const AuthContext = ({ children }) => {
  const login = (email, password) => {
    // code here
  };

  const logout = () => {
    // code here
  };

  const value = {
    login,
    logout,
  };

  return <ContextData.Provider value={value}>{children}</ContextData.Provider>;
};

export const useData = () => {
  const context = useContext(ContextData);
  if (!context) {
    throw new Error("useData must be used within AuthContext");
  }
  return context;
};
