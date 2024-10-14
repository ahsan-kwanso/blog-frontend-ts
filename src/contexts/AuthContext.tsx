import { createContext, useState, useEffect, ReactNode } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  SIGNOUT_MUTATION,
} from "../GraphQL/mutations";
import { CURRENT_USER_QUERY } from "../GraphQL/queries"; // Assume this is the query to get the current user
import { AuthContextType, User } from "../types/Contexts.interfaces";
import axiosInstanceAuth from "../axiosInstanceAuth";
import { AxiosResponse } from "axios";
import { API_URL } from "../utils/settings";

const initialAuthContext: AuthContextType = {
  user: null,
  setUser: () => {
    throw new Error("setUser function not implemented");
  },
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

const AuthContext = createContext<AuthContextType>(initialAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Apollo mutations for authentication
  const [login] = useMutation(LOGIN_MUTATION);
  const [signup] = useMutation(SIGNUP_MUTATION);
  const [signout] = useMutation(SIGNOUT_MUTATION);

  // Lazy query to fetch the current user
  const [fetchUser, { data: currentUserData, loading: userLoading }] =
    useLazyQuery(CURRENT_USER_QUERY, {
      fetchPolicy: "network-only",
    });

  // Effect to fetch the current user on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        await fetchUser(); // Fetch the current user from the server
      } catch (error) {
        console.error("Error fetching current user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [fetchUser]);

  // Effect to set user after login or fetching the current user
  useEffect(() => {
    if (currentUserData && currentUserData.currentUser) {
      setUser(currentUserData.currentUser);
    }
  }, [currentUserData]);

  const handleSignup = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);
      await signup({
        variables: { signupDto: { name, email, password } },
      });
      setLoading(false);
      return;
    } catch (error) {
      setLoading(false);
      console.error("Signup error:", error);
      throw new Error("Signup failed");
    }
  };

  const handleSignin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await login({
        variables: { loginDto: { email, password } },
      });
      if (response?.data?.login?.token) {
        await fetchUser(); // Fetch user after successful login
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      throw new Error("Login failed");
    }
  };

  const handleSignout = async () => {
    try {
      setLoading(true);
      await signout();
      setUser(null); // Clear user after sign-out
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Signout error:", error);
    }
  };

  const verifyEmail = async (token: string): Promise<AxiosResponse> => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // for testing the page
      const response = await axiosInstanceAuth.post(API_URL.verifyEmail, {
        token,
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
      value={{
        user,
        setUser,
        signup: handleSignup,
        signin: handleSignin,
        signout: handleSignout,
        verifyEmail: verifyEmail,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
