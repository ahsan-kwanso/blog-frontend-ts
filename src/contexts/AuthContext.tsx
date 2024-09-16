import { createContext, useState, useEffect, ReactNode } from "react";
import { getToken, setToken, removeToken } from "../utils/authUtils";
import axiosInstance from "../axiosInstance";
import { API_URL } from "../utils/settings";
import { User } from "../types/Contexts.interfaces";
import { AuthContextType } from "../types/Contexts.interfaces";
import { AxiosResponse } from "axios";

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
  verifyEmail: async () => {
    throw new Error("verifyEmail function not implemented");
  },
  loading: true,
};

// Create the context with initial values
const AuthContext = createContext<AuthContextType>(initialAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchUser = async () => {
    const token = getToken();
    if (token) {
      try {
        const response = await axiosInstance.get(API_URL.me);
        setUser(response.data); // in previous version with express js used response.data.user
      } catch (error: unknown) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse> => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(API_URL.signup, {
        name,
        email,
        password,
      });
      setLoading(false);
      return response;
    } catch (error: unknown) {
      let errorMessage = "Something went wrong!";
      if (error instanceof Error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = axiosError.response?.data?.message ?? "Invalid format";
      }
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  const signin = async (
    email: string,
    password: string
  ): Promise<AxiosResponse> => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(API_URL.signin, {
        email,
        password,
      });
      setToken(response.data.token);
      await fetchUser();
      setLoading(false);
      return response;
    } catch (error: unknown) {
      let errorMessage = "Something went wrong!";
      if (error instanceof Error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = axiosError.response?.data?.message ?? "Invalid format";
      }
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  const signout = () => {
    setUser(null);
    removeToken();
  };

  const verifyEmail = async (
    email: string,
    code: string
  ): Promise<AxiosResponse> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200)); // for better UX
      setLoading(true);
      const response = await axiosInstance.post(API_URL.verifyEmail, {
        email,
        code,
      });
      setLoading(false);
      return response;
    } catch (error: unknown) {
      let errorMessage = "Verification failed!";
      if (error instanceof Error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = axiosError.response?.data?.message ?? "Invalid format";
      }
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, signin, signout, verifyEmail, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
