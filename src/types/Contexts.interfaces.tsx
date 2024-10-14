import { ApolloError } from "@apollo/client"; // Import ApolloError for better error handling
import { AxiosResponse } from "axios";

export interface ThemeContextType {
  themeMode: string;
  toggleTheme: () => void;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  signup: (name: string, email: string, password: string) => void; // Return type updated to reflect GraphQL response
  signin: (email: string, password: string) => Promise<void>; // Return type changed to Promise<void>
  signout: () => Promise<void>; // Added Promise<void> return type for consistency
  verifyEmail: (token: string) => Promise<AxiosResponse<any>>;
  loading: boolean;
}

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt?: Date; // Optional, included for completeness
  isVerified: boolean;
  profilePictureUrl?: string;
  verificationToken?: string; // Optional, for verification purposes
}

export interface SnackbarContextType {
  showSnackbar: (
    message: string,
    type?: "success" | "error" | "warning" | "info"
  ) => void;
}
