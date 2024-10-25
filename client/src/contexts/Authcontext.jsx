import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const login = async (loginData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        loginData
      );
      const userData = res.data;
      localStorage.setItem("user", JSON.stringify(userData));
      if (res.status == 200) {
        const token = res.data.token;
        if (token) {
          localStorage.setItem("token", token);
          const decodedToken = jwtDecode(token);
          localStorage.setItem("userId", decodedToken.userId);
          localStorage.setItem("role", decodedToken.role);
        }
        console.log(token);
        return {
          success: true,
          message: "Login Successfull",
        };
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const logout = async (logout) => {
    try {
      const res = await axios.post(
        `
            ${import.meta.env.VITE_API_URL}/users/logout`,
        logout
      );
      if (res.status == 200) {
        localStorage.clear();
        return { success: true, message: "Logout successful" };
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
