/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  token: null,
  signUp: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const signUp = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        data,
        { withCredentials: true }
      );
      const accessToken = response.data.token;
      const user = {
        id: response.data.userID,
        email: response.data.email,
        roles: response.data.roles,
      };

      setUser(user);
      setToken(accessToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Sign up failed", error);
      alert("Sign up failed, please try again.");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password },
        { withCredentials: true }
      );

      const accessToken = response.data.token;
      const user = {
        id: response.data.userID,
        email: response.data.email,
        roles: response.data.roles,
      };

      setUser(user);
      setToken(accessToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed, please try again.");
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/users/logout",
        {},
        { withCredentials: true }
      );

      // Clear localStorage and reset state
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      setUser(null);
      setToken(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/isLoggedIn",
          { withCredentials: true }
        );

        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
          setUser(response.data.user); // Set user data  from response
          setToken(response.data.token); // Set token from response
        } else {
          setIsLoggedIn(false);
          setUser(null);
          setToken(null);
        }
      } catch (err) {
        console.error("Error checking logged in status:", err);
      }
    };

    checkIfLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        token,
        signUp,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
