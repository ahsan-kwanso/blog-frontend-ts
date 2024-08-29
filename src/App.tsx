import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import AppRoutes from "./routes/AppRoutes";
import "./utils/global.css";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SnackbarProvider>
          <AppRoutes />
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
