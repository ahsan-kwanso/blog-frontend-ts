import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getToken, setToken, removeToken } from "../utils/authUtils";
import axiosInstance from "../axiosInstance";
import { API_URL } from "../utils/settings";
import {User} from "../types/Contexts.interfaces"
import { AuthContextType } from "../types/Contexts.interfaces";


const initialAuthContext: AuthContextType = {
  user: null,
  signup: async () => {
    throw new Error("signup function not implemented");
  },
  signin: async () => {
    throw new Error("signin function not implemented");
  },
  signout: () => {
    throw new Error("signout function not implemented");
  },
};

// Create the context with initial values
const AuthContext = createContext<AuthContextType>(initialAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const token = getToken();
    if (token) {
      try {
        const response = await axiosInstance.get(API_URL.me);
        setUser(response.data.user);
      } catch (error: unknown) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post(API_URL.signup, {
        name,
        email,
        password,
      });
      setToken(response.data.token);
      await fetchUser();
      return response;
    } catch (error: unknown) {
      let errorMessage = "Something went wrong!";
      if (error instanceof Error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message ?? "Invalid format";
      }
      throw new Error(errorMessage);
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post(API_URL.signin, {
        email,
        password,
      });
      setToken(response.data.token);
      await fetchUser();
      return response;
    } catch (error: unknown) {
      let errorMessage = "Something went wrong!";
      if (error instanceof Error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message ?? "Invalid format";
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
