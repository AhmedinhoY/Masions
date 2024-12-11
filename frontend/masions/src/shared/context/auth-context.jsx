/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { HttpError } from "../../util/route-error";

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
      const token = response.data.token;
      const user = {
        id: response.data.userID,
        email: response.data.email,
        roles: response.data.roles,
      };

      localStorage.setItem("token", token);

      setUser(user);
      setToken(token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error.response.data.message);
      console.error("Sign up failed", error);
      const err = new HttpError("login failed",500,{details:'this is the details'});
      throw err
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password },
        { withCredentials: true }
      );

      const token = response.data.token;
      const user = {
        id: response.data.userID,
        email: response.data.email,
        roles: response.data.roles,
      };

      localStorage.setItem("token", token);

      setUser(user);
      setToken(token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed", error);
      const err = new HttpError("login failed",500,{details:'this is the details'});
      throw err
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("token");

      await axios.post(
        "http://localhost:3000/api/users/logout",
        {},
        {
          withCredentials: true,
        }
      );

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
        const token = localStorage.getItem("token");

        if (!token) {
          setIsLoggedIn(false);
          setUser(null);
          setToken(null);
          return;
        }
        const response = await axios.get(
          "http://localhost:3000/api/users/isLoggedIn",
          { withCredentials: true }
        );

        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
          setUser(response.data.user);
          setToken(token);

          console.log(response);
        } else {
          setIsLoggedIn(false);
          setUser(null);
          setToken(null);
          logout();
        }
      } catch (err) {
        console.error("Error checking logged in status:", err);
        setIsLoggedIn(false);
        setUser(null);
        setToken(null);
      }
    };

    checkIfLoggedIn();
  }, [token]); // may cause infinite loops

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
