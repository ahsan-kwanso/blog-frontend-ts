import React, { createContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../utils/authUtils";
import axiosInstance from "../axiosInstance";
import { API_URL } from "../utils/settings";

const initialAuthContext = {
  user: null,
  signup: async () => {},
  signin: async () => {},
  signout: () => {},
};

const AuthContext = createContext(initialAuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = getToken();
    if (token) {
      try {
        const response = await axiosInstance.get(API_URL.me);
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signup = async (name, email, password) => {
    try {
      const response = await axiosInstance.post(API_URL.signup, {
        name,
        email,
        password,
      });
      setToken(response.data.token);
      await fetchUser();
      return response;
    } catch (error) {
      let errorMessage = "Something went wrong!";
      if (error.response) {
        errorMessage = error.response.data.message;
        if (!error.response.data.message) errorMessage = "Invalid format";
      }
      throw new Error(errorMessage);
    }
  };

  const signin = async (email, password) => {
    try {
      const response = await axiosInstance.post(API_URL.signin, {
        email,
        password,
      });
      setToken(response.data.token);
      await fetchUser();
      return response;
    } catch (error) {
      let errorMessage = "Something went wrong!";
      if (error.response) {
        errorMessage = error.response.data.message;
        if (!error.response.data.message) errorMessage = "Invalid format";
      }
      throw new Error(errorMessage);
    }
  };

  const signout = () => {
    setUser(null);
    removeToken();
  };

  return (
    <AuthContext.Provider value={{ user, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
