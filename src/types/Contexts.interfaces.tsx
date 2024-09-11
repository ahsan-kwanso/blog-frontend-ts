import { AxiosResponse } from "axios";

export interface ThemeContextType {
  themeMode: string;
  toggleTheme: () => void;
}

export interface AuthContextType {
  user: User | null;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<AxiosResponse<any>>;
  signin: (email: string, password: string) => Promise<AxiosResponse<any>>;
  signout: () => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

export interface SnackbarContextType {
  showSnackbar: (
    message: string,
    type?: "success" | "error" | "warning" | "info"
  ) => void;
}
