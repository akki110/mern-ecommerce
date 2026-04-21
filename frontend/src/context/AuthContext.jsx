import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "../utils/constant";
import { useFetch } from "../hooks/useFetch";

export const ContextData = createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Use our custom hook for all auth requests
  const { loading: authLoading, callApi } = useFetch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsInitializing(false);
  }, []);

  // Handle common auth success logic
  const handleAuthSuccess = (data, message) => {
    if (data.success) {
      const userData = data.data.user;
      const token = data.data.token;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      if (token) localStorage.setItem("token", token);

      toast.success(message);
      return { success: true };
    }
  };

  const register = async (name, email, password) => {
    try {
      const data = await callApi({
        method: "POST",
        endpoint: `${API_ENDPOINTS.AUTH}/register`,
        body: { name, email, password },
      });
      return handleAuthSuccess(data, "Account created successfully!");
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed";
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const login = async (email, password) => {
    try {
      const data = await callApi({
        method: "POST",
        endpoint: `${API_ENDPOINTS.AUTH}/login`,
        body: { email, password },
      });
      return handleAuthSuccess(data, "Login successful!");
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed";
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    loading: isInitializing || authLoading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
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
