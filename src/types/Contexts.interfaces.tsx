import { AxiosResponse } from "axios";

export interface ThemeContextType {
  themeMode: string;
  toggleTheme: () => void;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void; // Add this line
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<AxiosResponse<any>>;
  //signin: (email: string, password: string) => Promise<AxiosResponse<any>>;
  signin: (email: string, password: string) => void;
  signout: () => void;
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
  updatedAt?: Date; // Added updatedAt for completeness
  isVerified: boolean;
  profilePictureUrl?: string;
  verificationToken?: string; // Added verificationToken if needed
}

export interface SnackbarContextType {
  showSnackbar: (
    message: string,
    type?: "success" | "error" | "warning" | "info"
  ) => void;
}
